#!/bin/bash -e

source /bootstrap/config.sh

domain="consul.${BASE_DOMAIN}"

# Wait for Vault to start
/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"

export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"

# set VAULT_TOKEN
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d":" | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

# generate consul certificates
certs=$(vault write "pki/issue/base-domain" \
    common_name="${domain}" \
    ip_sans="127.0.0.1")

tls_dir="/opt/tls/consul"
mkdir -p "${tls_dir}"
# write certificate and key to /opt/tls/vault/
echo "${certs}" | grep -w certificate -A22 | sed 's/certificate *//' > "${tls_dir}/certificate"
chmod 0666 "${tls_dir}/certificate"
echo "${certs}" | grep -w private_key -A26 | sed 's/private_key *//' > "${tls_dir}/key"
chmod 0400 "${tls_dir}/key"
echo "${certs}" | grep -w issuing_ca -A19 | sed 's/issuing_ca *//' > "${tls_dir}/issuing_ca"
chmod 0666 "${tls_dir}/issuing_ca"
chown consul:consul ${tls_dir}/*

cat << EOF > /etc/consul.d/tls.hcl
addresses {
  https = "0.0.0.0"
}
ports {
  http = -1
  https = 8501
}
ca_file   = "${tls_dir}/issuing_ca"
cert_file = "${tls_dir}/certificate"
key_file  = "${tls_dir}/key"
EOF

# configure advertise_addr
iface=$(ip link | grep -v docker -A1 | grep -v lo -A1 | head -n1 | cut -f2 -d: | tr -d '[:space:]')
ip_addr=$(ip addr | grep ${iface} | grep -oP 'inet ([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)' | cut -f2 -d" ")
echo "advertise_addr = \"${ip_addr}\"" >> /etc/consul.d/server.hcl


# Start consul and wait for it
systemctl enable consul
systemctl restart consul
/usr/local/bin/wait-for-it.sh "${CONSUL_HOST}:${CONSUL_PORT}"

export CONSUL_HTTP_ADDR="${CONSUL_HOST}:${CONSUL_PORT}"
export CONSUL_HTTP_SSL=true

sleep 10

# Bootstrap Consul ACLs
consul acl bootstrap > /root/consul-keys

bootstrap_secret_id=$(cat /root/consul-keys | grep -w "SecretID" | cut -f2 -d: | tr -d '[:space:]')
export CONSUL_HTTP_TOKEN="${bootstrap_secret_id}"

# Agent Policy
hostname=$(hostname -f)
cat <<EOF > /bootstrap/server-policy.consul.hcl
node "${hostname}" {
  policy = "write"
}
EOF

consul acl policy create \
  -name "${hostname}-agent" \
  -rules @/bootstrap/server-policy.consul.hcl

consul acl token create -description "${hostname} agent token" \
  -policy-name "${hostname}-agent" > /root/consul-agent
agent_secret_id=$(cat /root/consul-agent | grep -w "SecretID" | cut -f2 -d: | tr -d '[:space:]')

# Anonymous Policy
consul acl policy create \
  -name "anonymous" \
  -rules @/bootstrap/anonymous-policy.consul.hcl
consul acl token create -description "anonymous token" \
  -policy-name "anonymous" > /root/consul-anonymous
anonymous_secret_id=$(cat /root/consul-anonymous | grep -w "SecretID" | cut -f2 -d: | tr -d '[:space:]')

cat <<EOF > /etc/consul.d/acl.hcl
acl = {
  enabled                  = true
  default_policy           = "deny"
  enable_token_persistence = true
  tokens = {
    agent = "${agent_secret_id}"
    default = "${anonymous_secret_id}"
  }
}
EOF

# Restart consul and wait for it
systemctl restart consul
/usr/local/bin/wait-for-it.sh "${CONSUL_HOST}:${CONSUL_PORT}"


# Enable consul secrets in Vault
vault secrets enable consul

consul acl token create -policy-name=global-management -description="vault" > /root/consul-vault
vault_secret_id=$(cat /root/consul-vault | grep -w "SecretID" | cut -f2 -d: | tr -d '[:space:]')
vault write consul/config/access \
    scheme="https" \
    address="127.0.0.1:8501" \
    token="${vault_secret_id}"

# Make consul admin role in Vault
vault write consul/roles/admin policies=global-management


# Enable Nomad + Consul integration
consul acl token create -policy-name=global-management -description="nomad" > /root/consul-nomad
nomad_secret_id=$(cat /root/consul-nomad | grep -w "SecretID" | cut -f2 -d: | tr -d '[:space:]')
cat <<EOF > /etc/nomad.d/consul.hcl
consul {
  address = "127.0.0.1:8501"
  ssl     = true
  token   = "${nomad_secret_id}"
}
EOF

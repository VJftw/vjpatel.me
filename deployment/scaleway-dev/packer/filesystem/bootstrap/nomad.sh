#!/bin/bash -e

source /bootstrap/config.sh

domain="nomad.${BASE_DOMAIN}"

# Wait for Nomad and Vault to start
/usr/local/bin/wait-for-it.sh "${NOMAD_HOST}:${NOMAD_PORT}"
/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"

export NOMAD_ADDR="http://${NOMAD_HOST}:${NOMAD_PORT}"
export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"

# set VAULT_TOKEN
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d":" | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

# generate nomad certificates
certs=$(vault write "pki/issue/base-domain" \
    common_name="${domain}" \
    ip_sans="127.0.0.1")

tls_dir="/opt/tls/nomad"
mkdir -p "${tls_dir}"
# write certificate and key to /opt/tls/vault/
echo "${certs}" | grep -w certificate -A22 | sed 's/certificate *//' > "${tls_dir}/certificate"
chmod 0666 "${tls_dir}/certificate"
echo "${certs}" | grep -w private_key -A26 | sed 's/private_key *//' > "${tls_dir}/key"
chmod 0400 "${tls_dir}/key"
echo "${certs}" | grep -w issuing_ca -A19 | sed 's/issuing_ca *//' > "${tls_dir}/issuing_ca"
chmod 0666 "${tls_dir}/issuing_ca"
chown nomad:nomad ${tls_dir}/*

cat << EOF > /etc/nomad.d/tls.hcl
tls {
  http = true
  rpc = true

  ca_file   = "${tls_dir}/issuing_ca"
  cert_file = "${tls_dir}/certificate"
  key_file  = "${tls_dir}/key"

  # verify_server_hostname = true
  # verify_https_client    = true
}
EOF

# Restart Nomad and wait for it
systemctl restart nomad
/usr/local/bin/wait-for-it.sh "${NOMAD_HOST}:${NOMAD_PORT}"

export NOMAD_ADDR="https://${NOMAD_HOST}:${NOMAD_PORT}"

# Bootstrap Nomad ACLs
nomad acl bootstrap > /root/nomad-keys
chmod 0400 /root/nomad-keys

bootstrap_secret_id=$(cat /root/nomad-keys | grep -w "Secret ID" | cut -f2 -d= | tr -d '[:space:]')
export NOMAD_TOKEN="${bootstrap_secret_id}"

nomad acl policy apply anonymous /bootstrap/anonymous-policy.nomad.hcl


vault secrets enable nomad
vault write nomad/config/access \
    address="${NOMAD_ADDR}" \
    token="${NOMAD_TOKEN}"

# vault write nomad/role/anonymous policies=anonymous

vault write nomad/role/admin type=management global=true

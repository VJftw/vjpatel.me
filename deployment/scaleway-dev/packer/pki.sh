#!/bin/bash -xe
# TODO: renew tls certs
# TODO: support use of intermediate CA for default trust

mkdir /opt/tls

curl -L https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
  -o /usr/local/bin/wait-for-it.sh
chmod +x /usr/local/bin/wait-for-it.sh

cat <<'EOF' > /usr/local/bin/pki-bootstrap.sh
#!/bin/bash -e

/usr/local/bin/wait-for-it.sh 127.0.0.1:8200

source /opt/vault/config.sh

export VAULT_ADDR=http://127.0.0.1:8200


# Initialise Vault
vault operator init > /root/vault-keys
chmod 0400 /root/vault-keys

# Unseal Vault
for i in {1..3}; do
  unsealKey=$(cat /root/vault-keys | grep "Unseal Key" | head -n$i | tail -n1 | cut -f2 -d":" | tr -d '[:space:]')
  vault operator unseal $unsealKey
done

# Use root token
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d":" | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

vault secrets enable pki
vault secrets tune -max-lease-ttl=87600h pki
vault write pki/root/generate/internal common_name=dev.vjpatel.me ttl=87600h
vault write pki/config/urls \
  issuing_certificates="http://127.0.0.1:8200/v1/pki/ca" \
  crl_distribution_points="http://127.0.0.1:8200/v1/pki/crl"


vault write pki/roles/dev-vjpatel-dot-me \
    allowed_domains=dev.vjpatel.me \
    allow_subdomains=true max_ttl=72h

mkdir -p /opt/tls/vault/
certs=$(vault write pki/issue/dev-vjpatel-dot-me \
    common_name=vault.dev.vjpatel.me \
    ip_sans="127.0.0.1")

# write certificate and key to /opt/tls/vault/
echo "${certs}" | grep -w certificate -A22 | sed 's/certificate *//' > /opt/tls/vault/certificate
chmod 0666 /opt/tls/vault/certificate
echo "${certs}" | grep -w private_key -A26 | sed 's/private_key *//' > /opt/tls/vault/key
chmod 0400 /opt/tls/vault/key
chown vault:vault /opt/tls/vault/key
echo "${certs}" | grep -w issuing_ca -A19 | sed 's/issuing_ca *//' > /opt/tls/vault/issuing_ca
chmod 0666 /opt/tls/vault/issuing_ca

# add issuing_ca to OS trust store
cp /opt/tls/vault/issuing_ca /usr/local/share/ca-certificates/dev.vjpatel.me.crt
/usr/sbin/update-ca-certificates

cat << EOFA > /etc/vault.d/listener.hcl
listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "/opt/tls/vault/certificate"
  tls_key_file  = "/opt/tls/vault/key"
}
EOFA

systemctl restart vault

/usr/local/bin/wait-for-it.sh 127.0.0.1:8200

export VAULT_ADDR=https://127.0.0.1:8200
# Unseal Vault
for i in {1..3}; do
  unsealKey=$(cat /root/vault-keys | grep "Unseal Key" | head -n$i | tail -n1 | cut -f2 -d":" | tr -d '[:space:]')
  vault operator unseal $unsealKey
done

# Vault admin policy
cat << EOFA > admin-policy.hcl
# Manage auth methods broadly across Vault
path "auth/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Create, update, and delete auth methods
path "sys/auth/*"
{
  capabilities = ["create", "update", "delete", "sudo"]
}

# List auth methods
path "sys/auth"
{
  capabilities = ["read"]
}

# List existing policies
path "sys/policies/acl"
{
  capabilities = ["list"]
}

# Create and manage ACL policies
path "sys/policies/acl/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}

# Read health checks
path "sys/health"
{
  capabilities = ["read", "sudo"]
}

# Create nomad admin credentials
path "nomad/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
EOFA

vault policy write admin admin-policy.hcl


# Bootstrap Nomad ACLs
nomad acl bootstrap > /root/nomad-keys
chmod 0400 /root/nomad-keys

bootstrap_secret_id=$(cat /root/nomad-keys | grep -w "Secret ID" | cut -f2 -d= | tr -d '[:space:]')
export NOMAD_TOKEN="${bootstrap_secret_id}"

# anonymous read
cat > anonymous.json <<EOFA
{
    "Name": "anonymous",
    "Description": "Allow read-only access for anonymous requests",
    "Rules": "
        namespace \"default\" {
            policy = \"read\"
        }
        agent {
            policy = \"read\"
        }
        node {
            policy = \"read\"
        }
    "
}
EOFA

curl --request POST \
    --data @anonymous.json \
    -H "X-Nomad-Token: $NOMAD_TOKEN" \
    http://localhost:4646/v1/acl/policy/anonymous

vault write nomad/role/admin type=management global=true
EOF
chmod +x /usr/local/bin/pki-bootstrap.sh

cat <<EOF > /etc/systemd/system/pki.service
[Unit]
Description=Bootstrap Vault PKI
After=vault.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/pki-bootstrap.sh
StandardOutput=journal

[Install]
WantedBy=multi-user.target
EOF

systemctl enable pki

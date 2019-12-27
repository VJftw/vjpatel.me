#!/bin/bash -e

source /bootstrap/config.sh

domain="vault.${BASE_DOMAIN}"

# Wait for Vault to start
/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"

export VAULT_ADDR="http://${VAULT_HOST}:${VAULT_PORT}"

# Initialise Vault
vault operator init > /root/vault-keys
chmod 0400 /root/vault-keys

# Unseal Vault
for i in {1..3}; do
  unsealKey=$(cat /root/vault-keys | grep "Unseal Key" | head -n$i | tail -n1 | cut -f2 -d":" | tr -d '[:space:]')
  vault operator unseal $unsealKey
done

# set root token for further provisioning
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d":" | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

vault secrets enable pki
vault secrets tune -max-lease-ttl=87600h pki
vault write pki/root/generate/internal common_name="${BASE_DOMAIN}" ttl=87600h
vault write pki/config/urls \
  issuing_certificates="https://${domain}:8200/v1/pki/ca" \
  crl_distribution_points="https://${domain}:8200/v1/pki/crl"

vault write "pki/roles/base-domain" \
    allowed_domains="${BASE_DOMAIN}" \
    allow_subdomains=true max_ttl=72h

certs=$(vault write "pki/issue/base-domain" \
    common_name="${domain}" \
    ip_sans="127.0.0.1")

# write certificate and key to /opt/tls/vault/
tls_dir="/opt/tls/vault"
mkdir -p "${tls_dir}"
# write certificate and key to /opt/tls/vault/
echo "${certs}" | grep -w certificate -A22 | sed 's/certificate *//' > "${tls_dir}/certificate"
chmod 0666 "${tls_dir}/certificate"
echo "${certs}" | grep -w private_key -A26 | sed 's/private_key *//' > "${tls_dir}/key"
chmod 0400 "${tls_dir}/key"
echo "${certs}" | grep -w issuing_ca -A19 | sed 's/issuing_ca *//' > "${tls_dir}/issuing_ca"
chmod 0666 "${tls_dir}/issuing_ca"
chown vault:vault ${tls_dir}/*


cat << EOF > /etc/vault.d/listener.hcl
listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "${tls_dir}/certificate"
  tls_key_file  = "${tls_dir}/key"
}
EOF


# add issuing_ca to OS trust store
cp /opt/tls/vault/issuing_ca /usr/local/share/ca-certificates/${BASE_DOMAIN}.crt
/usr/sbin/update-ca-certificates

cat << EOFA > /etc/vault.d/listener.hcl
listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "${tls_dir}/certificate"
  tls_key_file  = "${tls_dir}/key"
}
EOFA

# Restart Vault and wait for it
systemctl restart vault
/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"

# Use TLS with Vault
export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"
# Unseal Vault
for i in {1..3}; do
  unsealKey=$(cat /root/vault-keys | grep "Unseal Key" | head -n$i | tail -n1 | cut -f2 -d":" | tr -d '[:space:]')
  vault operator unseal $unsealKey
done

# Set-up initial Vault admin policy
vault policy write admin /bootstrap/admin-policy.vault.hcl

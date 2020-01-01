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
  unsealKey=$(cat /root/vault-keys | grep "Unseal Key" | head -n$i | tail -n1 | cut -f2 -d: | tr -d '[:space:]')
  vault operator unseal $unsealKey
done

# set root token for further provisioning
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d: | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

vault secrets enable pki
vault secrets tune -max-lease-ttl=87600h pki
vault write pki/root/generate/internal common_name="${BASE_DOMAIN}" ttl=87600h
vault write pki/config/urls \
  issuing_certificates="https://${domain}:8200/v1/pki/ca" \
  crl_distribution_points="https://${domain}:8200/v1/pki/crl"

# Add CA to Trust store
curl "http://${VAULT_HOST}:${VAULT_PORT}/v1/pki/ca/pem" \
  -o /usr/local/share/ca-certificates/${BASE_DOMAIN}.crt
/usr/sbin/update-ca-certificates

# Generate Vault TLS cert
pkiCerts "pki" "base-domain" \
  "" \
  "${domain}" \
  "" \
  "127.0.0.1,${advertise_ip}" \
  "vault" \
  "/opt/tls/vault" \
  "${domain}"

cat << EOF > /etc/vault.d/listener.hcl
listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "/opt/tls/vault/${domain}.crt"
  tls_key_file  = "/opt/tls/vault/${domain}.key"
}
EOF

# Restart Vault and wait for it
systemctl restart vault
/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"

# Use TLS with Vault
export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"
# Unseal Vault
for i in {1..3}; do
  unsealKey=$(cat /root/vault-keys | grep "Unseal Key" | head -n$i | tail -n1 | cut -f2 -d: | tr -d '[:space:]')
  vault operator unseal $unsealKey
done

# Bootstrap initial policies
policies=$(echo "${VAULT_GROUPS}" | cut -d: -f2 | sort | uniq)
for policy in ${policies}; do
  echo "writing ${policy} policy"
  vault policy write "${policy}" "/bootstrap/${policy}-policy.vault.hcl"
done

oidc_accessor=$(vault auth list -detailed | grep -w oidc | awk -F '  +' '{print $3}')

# Bootstrap initial entities
for entity in ${VAULT_ENTITIES}; do
  echo "writing ${entity} entity"
  entity_name=$(echo "${entity}" | cut -d: -f1)
  oidc_name=$(echo "${entity}" | cut -d: -f2 | cut -d, -f1)
  vault write identity/entity \
    name="${entity_name}" \
    policies=""
done

# Bootstrap inital groups
for group in ${VAULT_GROUPS}; do
  echo "writing ${group} group"
  group_name=$(echo "${group}" | cut -d: -f1)
  policies=$(echo "${group}" | cut -d: -f2)
  entities=$(echo "${group}" | cut -d: -f3 | sed 's/,/ /g')
  entity_ids=""
  for entity in ${entities}; do
    entity_id=$(vault read identity/entity/name/${entity} | grep -w id | grep -v '\[' | awk -F '  +' '{print $2}')
    entity_ids="${entity_id},${entity_ids}"
  done
  vault write /identity/group \
    name="${group_name}" \
    member_entity_ids="${entity_ids}" \
    policies="${policies}"
done

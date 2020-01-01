#!/bin/bash -e

source /bootstrap/config.sh

/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"
export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d: | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

# Configure Hashicorp Vault integration
kubectl apply -f /bootstrap/kubernetes/hashicorp-vault-auth/vault-auth-service-account.yaml

vault_sa_name=$(kubectl get sa vault-auth -o jsonpath="{.secrets[*]['name']}")
sa_jwt_token=$(kubectl get secret ${vault_sa_name} -o jsonpath="{.data.token}" | base64 --decode; echo)

vault auth enable kubernetes
vault write auth/kubernetes/config \
  token_reviewer_jwt="$sa_jwt_token" \
  kubernetes_host="https://${advertise_ip}:6443" \
  kubernetes_ca_cert=@/usr/local/share/ca-certificates/${BASE_DOMAIN}.crt

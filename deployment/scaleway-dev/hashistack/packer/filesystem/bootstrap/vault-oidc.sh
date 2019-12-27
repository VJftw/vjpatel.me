#!/bin/bash -e

source /bootstrap/config.sh

usage() {
cat <<EOF
$0 --client-id "my-client-id" --client-secret "my-client-secret"
EOF
}

client_id=""
client_secret=""
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  --client-id )
    shift; client_id=$1
    ;;
  --client-secret )
    shift; client_secret=$1
    ;;
  -h | --help )
    usage
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi

if [ -z "${client_id}" ]; then
  echo "missing --client-id"
  exit 2
fi

if [ -z "${client_secret}" ]; then
  echo "missing --client-secret"
  exit 2
fi

# Wait for Vault to start
echo "-> Waiting for Vault to be up"
/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"

export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"

# get vault root token
echo "-> Getting Vault root token"
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d":" | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

echo "-> enabling OIDC"
vault auth enable oidc

echo "-> writing OIDC config"
vault write auth/oidc/config \
        oidc_discovery_url="${OIDC_DISCOVERY_URL}" \
        oidc_client_id="${client_id}" \
        oidc_client_secret="${client_secret}" \
        default_role="${OIDC_DEFAULT_ROLE}"

echo "-> add OIDC default role"
vault write auth/oidc/role/${OIDC_DEFAULT_ROLE} \
        bound_audiences="${client_id}" \
        allowed_redirect_uris="https://vault.${BASE_DOMAIN}:8200/ui/vault/auth/oidc/oidc/callback" \
        allowed_redirect_uris="https://vault.${BASE_DOMAIN}:8250/oidc/callback" \
        user_claim="sub" \
        policies="${OIDC_DEFAULT_ROLE}"

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

echo "-> enabling OIDC Authentication"
vault auth enable oidc || true
vault write sys/auth/oidc/tune \
  listing_visibility="unauth"

echo "-> add OIDC authententication default role"
vault write auth/oidc/role/default \
        bound_audiences="${client_id}" \
        allowed_redirect_uris="https://vault.${BASE_DOMAIN}:8200/ui/vault/auth/oidc/oidc/callback" \
        allowed_redirect_uris="http://localhost:8250/oidc/callback" \
        oidc_scopes="email" \
        user_claim="email" \
        policies="default"

echo "-> writing OIDC authentication config"
vault write auth/oidc/config \
        oidc_discovery_url="${OIDC_DISCOVERY_URL}" \
        oidc_client_id="${client_id}" \
        oidc_client_secret="${client_secret}" \
        default_role="default"

echo "-> Configuring OIDC provider"
vault write identity/oidc/config \
  issuer="https://vault.${BASE_DOMAIN}:8200"

oidc_accessor=$(vault auth list -detailed | grep -w oidc | awk -F '  +' '{print $3}')

# Bootstrap OIDC entities
for entity in ${VAULT_ENTITIES}; do
  echo "adding ${entity} OIDC entity alias"
  entity_name=$(echo "${entity}" | cut -d: -f1)
  oidc_name=$(echo "${entity}" | cut -d: -f2 | cut -d, -f1)
  entity_id=$(vault read identity/entity/name/${entity_name} | grep -w id | grep -v '\[' | awk -F '  +' '{print $2}')
  vault write identity/entity-alias \
    name="${oidc_name}" \
    canonical_id="${entity_id}" \
    mount_accessor="${oidc_accessor}"
done

# Kubernetes OIDC
#

vault write identity/oidc/key/kubernetes \
  rotation_period="12h" \
  verification_ttl="24h"

jwt_template="
{
  \"user\": {{identity.entity.name}},
  \"groups\": {{identity.entity.groups.names}}
}
"
# create role that uses named key
vault write identity/oidc/role/kubernetes \
  key="kubernetes" \
  ttl="12h" \
  template="${jwt_template}" # can also add template for more descriptive jwt

role_client_id=$(vault read identity/oidc/role/kubernetes | grep -w client_id | awk -F '  +' '{print $2}')
vault write identity/oidc/key/kubernetes \
  rotation_period="12h" \
  verification_ttl="24h" \
  allowed_client_ids="${role_client_id}"

# vault read identity/oidc/token/kubernetes

cat << EOF > /root/kubadm.conf
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.17.0
apiServer:
  extraArgs:
    oidc-issuer-url: "https://vault.${BASE_DOMAIN}:8200/v1/identity/oidc"
    oidc-client-id: "${role_client_id}"
    oidc-username-claim: user
    oidc-username-prefix: "oidc:vault:"
    oidc-groups-claim: groups
    oidc-groups-prefix: "oidc:vault:"
EOF

cat << EOF | kubectl apply -f -
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
  name: cluster-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: system:masters
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: oidc:vault:admin
EOF

kubeadm upgrade apply \
  --config kubadm.conf \
  --certificate-renewal=false \
  --yes

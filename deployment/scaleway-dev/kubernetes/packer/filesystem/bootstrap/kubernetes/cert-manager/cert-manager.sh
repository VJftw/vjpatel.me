#!/bin/bash -e

source /bootstrap/config.sh

/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"
export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d: | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

# Configure cert-manager with Vault
kubectl create namespace cert-manager
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v0.12.0/cert-manager.yaml
kubectl -n cert-manager create serviceaccount cert-manager

vault write auth/kubernetes/role/cert-manager \
        bound_service_account_names=cert-manager-vault \
        policies=cert-manager \
        bound_service_account_namespaces=cert-manager \
        ttl=24h

vault policy write cert-manager /bootstrap/kubernetes/cert-manager/cert_manager-policy.vault.hcl

cat << EOF | kubectl apply -f -
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cert-manager-vault
  namespace: cert-manager
EOF

cert_manager_vault_token=$(kubectl get secret -n cert-manager | grep cert-manager-vault-token | cut -f1 -d" ")

cat << EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  namespace: cert-manager
  name: vault-issuer
spec:
  vault:
    path: pki/sign/base-domain
    server: https://${advertise_ip}:8200
    caBundle: $(awk 1 /etc/kubernetes/pki/apiserver.crt /usr/local/share/ca-certificates/${BASE_DOMAIN}.crt | base64 -w0 -)
    auth:
     kubernetes:
        role: cert-manager
        mountPath: /v1/auth/kubernetes
        secretRef:
          name: ${cert_manager_vault_token}
          key: token
EOF

#!/bin/bash -e

source /bootstrap/config.sh

# Copy ca.crt
cp "/usr/local/share/ca-certificates/${BASE_DOMAIN}.crt" /bootstrap/kubernetes/setup-web/ca.crt

# Generate kube-config
ca_data=$(base64 -w0 /etc/kubernetes/pki/apiserver.crt)
cat << EOF > /bootstrap/kubernetes/setup-web/kube-config.yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${ca_data}
    server: https://kubernetes.${BASE_DOMAIN}:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: user
  name: user@kubernetes
current-context: user@kubernetes
kind: Config
preferences: {}
users:
- name: user
  user:
    exec:
      command: /bin/sh
      env:
        - name: VAULT_ADDRESS
          vault: https://vault.${BASE_DOMAIN}:8200
      args:
        - "-c"
        - vault read identity/oidc/token/kubernetes -format=json | jq '{"apiVersion":"client.authentication.k8s.io/v1beta1","kind":"ExecCredential","status":{"token": .data.token}}'
EOF

kustomize build /bootstrap/kubernetes/setup-web | kubectl apply -f-

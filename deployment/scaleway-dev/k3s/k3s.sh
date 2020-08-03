#!/bin/bash -e

# VARS
k3s_domain="${1}"
oidc_issuer_url="${2}"
oidc_client_id="${3}"

acme_email="${4}"

# install yq
curl -L https://github.com/mikefarah/yq/releases/download/3.3.2/yq_linux_amd64 -o /usr/local/bin/yq
chmod +x /usr/local/bin/yq

# Install K3s
export INSTALL_K3S_SKIP_START="true"
curl -sfL https://get.k3s.io | sh -

# Set up OIDC
mkdir -p /var/lib/rancher/k3s/server/manifests
cat <<'EOF' > /var/lib/rancher/k3s/server/manifests/oidc-admin.yaml
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: oidc-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: Group
  name: oidc:admin
EOF

# Update systemd unit for k3s via /etc/systemd/system/k3s.service.d/override.conf
mkdir -p /etc/systemd/system/k3s.service.d
cat <<EOF > /etc/systemd/system/k3s.service.d/override.conf
[Service]
ExecStart=
ExecStart=/usr/local/bin/k3s server \
  --tls-san ${k3s_domain} \
  --kube-apiserver-arg oidc-issuer-url=${oidc_issuer_url} \
  --kube-apiserver-arg oidc-client-id=${oidc_client_id} \
  --kube-apiserver-arg oidc-username-claim=email \
  --kube-apiserver-arg oidc-username-prefix=oidc: \
  --kube-apiserver-arg oidc-groups-claim=http://schemas.microsoft.com/ws/2008/06/identity/claims/role \
  --kube-apiserver-arg oidc-groups-prefix=oidc:
EOF


# start systemd unit for k3s
systemctl daemon-reload
systemctl enable k3s
systemctl start k3s

# Configure Traefik to use ACME (LetsEncrypt)
cp /var/lib/rancher/k3s/server/manifests/traefik.yaml /var/lib/rancher/k3s/server/manifests/traefik.yaml.bak
new_traefik_values=$(yq r /var/lib/rancher/k3s/server/manifests/traefik.yaml spec.valuesContent \
  | yq w - acme.enabled true \
  | yq w - acme.email "${acme_email}" \
  | yq w - acme.domains.enabled true \
  | yq w - acme.challengeType "tls-alpn-01" \
  | yq w - acme.domains.domainsList[+].main "${k3s_domain}"
)
yq w -i /var/lib/rancher/k3s/server/manifests/traefik.yaml spec.valuesContent "${new_traefik_values}"



# print out kubeconfig
certificate_authority_data=$(cat /etc/rancher/k3s/k3s.yaml | grep certificate-authority-data | cut -f2 -d: | tr -d '[:space:]')


# TODO: start a webservice that serves these commands to copy and paste
cat <<EOF
Run the below commands to configure your kubectl config:

kubectl config set-cluster ${k3s_domain} \
    --server https://${k3s_domain}:6443

kubectl config set clusters.${k3s_domain}.certificate-authority-data "${certificate_authority_data}"

kubectl config set-context ${k3s_domain} \
    --cluster ${k3s_domain} \
    --user oidc

kubectl config set-credentials oidc \
	  --exec-api-version=client.authentication.k8s.io/v1beta1 \
	  --exec-command=kubectl \
	  --exec-arg=oidc-login \
	  --exec-arg=get-token \
	  --exec-arg=--oidc-issuer-url=${oidc_issuer_url} \
	  --exec-arg=--oidc-client-id=${oidc_client_id} \
	  --exec-arg=--oidc-extra-scope=profile \
	  --exec-arg=--oidc-extra-scope=email


kubectl oidc-login setup \
  --oidc-issuer-url=${oidc_issuer_url} \
  --oidc-client-id=${oidc_client_id} \
  --oidc-extra-scope="profile" \
  --oidc-extra-scope="email"
EOF

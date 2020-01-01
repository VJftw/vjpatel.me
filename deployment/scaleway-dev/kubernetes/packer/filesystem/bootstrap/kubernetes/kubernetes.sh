#!/bin/bash -e

source /bootstrap/config.sh

/usr/local/bin/wait-for-it.sh "${VAULT_HOST}:${VAULT_PORT}"
export VAULT_ADDR="https://${VAULT_HOST}:${VAULT_PORT}"
rootToken=$(cat /root/vault-keys | grep "Initial Root Token:" | head -n1 | cut -f2 -d: | tr -d '[:space:]')
export VAULT_TOKEN="${rootToken}"

function intermediate {
  local common_name=$1
  local f_path=$2

  local v_path="pki_${common_name//\./-}"

  # Generate and use intermediate kubernetes CA from dev.vjpatel.me Root CA
  vault secrets enable -path=${v_path} pki || true

  vault write ${v_path}/config/urls \
    issuing_certificates="https://vault.${BASE_DOMAIN}:8200/v1/${v_path}/ca" \
    crl_distribution_points="https://vault.${BASE_DOMAIN}:8200/v1/${v_path}/crl"

  vault secrets tune -max-lease-ttl=43800h ${v_path}
  resp=$(
    vault write ${v_path}/intermediate/generate/exported \
    common_name="${common_name}" \
    ttl=43800h \
    -format=json
  )

  csr=$(echo "${resp}"| jq -r '.data.csr')

  certs=$(
    vault write pki/root/sign-intermediate \
    csr="${csr}" \
    format=pem_bundle \
    ttl=43800h \
    -format=json
  )
  intermediate_signed_cert=$(echo "${certs}" | jq -r '.data.certificate' )
  bundle=$(echo "${intermediate_signed_cert}" | cat - /usr/local/share/ca-certificates/${BASE_DOMAIN}.crt)
  vault write ${v_path}/intermediate/set-signed certificate="${bundle}"

  mkdir -p $(dirname "${f_path}")
  echo "${resp}"| jq -r '.data.private_key' > "${f_path}.key"
  curl "https://${VAULT_HOST}:${VAULT_PORT}/v1/${v_path}/ca/pem" \
    -o "${f_path}.crt"
}

intermediate "kubernetes.dev.vjpatel.me" "/etc/kubernetes/pki/ca"
intermediate "etcd.dev.vjpatel.me" "/etc/kubernetes/pki/front-proxy-ca"
intermediate "kubernetes-front-proxy.dev.vjpatel.me" "/etc/kubernetes/pki/etcd/ca"

# Generate K8s CA certificates via Kubeadm and append intermediate CA, so that browsers with RootCA trust them.
# TODO: generate certificates via Vault, instead of giving kubeadm ca.key
domain="kubernetes.${BASE_DOMAIN}"
kubeadm init phase certs all \
  --apiserver-cert-extra-sans "kubernetes.dev.vjpatel.me"

cat /etc/kubernetes/pki/ca.crt >> /etc/kubernetes/pki/apiserver.crt
cat /etc/kubernetes/pki/etcd/ca.crt >> /etc/kubernetes/pki/apiserver-etcd-client.crt
cat /etc/kubernetes/pki/ca.crt >> /etc/kubernetes/pki/apiserver-kubelet-client.crt
cat /etc/kubernetes/pki/front-proxy-ca.crt >> /etc/kubernetes/pki/front-proxy.crt
cat /etc/kubernetes/pki/front-proxy-ca.crt >> /etc/kubernetes/pki/front-proxy-client.crt
cat /etc/kubernetes/pki/etcd/ca.crt >> /etc/kubernetes/pki/etcd/healthcheck-client.crt
cat /etc/kubernetes/pki/etcd/ca.crt >> /etc/kubernetes/pki/etcd/peer.crt
cat /etc/kubernetes/pki/etcd/ca.crt >> /etc/kubernetes/pki/etcd/server.crt

# Init Kubernetes
kubeadm init \
  --pod-network-cidr=192.168.0.0/16

mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config

# Untaint master node
master_node_names=$(kubectl get node | grep master | awk -F '  +' '{print $1}')
for node in ${master_node_names}; do
  kubectl taint nodes ${node} node-role.kubernetes.io/master:NoSchedule- || true
done

# Calico CNI
kubectl apply -f https://docs.projectcalico.org/v3.8/manifests/calico.yaml

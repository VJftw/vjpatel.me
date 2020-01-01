#!/bin/bash -e

apt-get update && apt-get install -y jq

curl -L https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
  -o /usr/local/bin/wait-for-it.sh
chmod +x /usr/local/bin/wait-for-it.sh

export KUSTOMIZE_VERSION="v3.5.3"
curl -LO "https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2F${KUSTOMIZE_VERSION}/kustomize_${KUSTOMIZE_VERSION}_linux_amd64.tar.gz"
tar -xvzf "kustomize_${KUSTOMIZE_VERSION}_linux_amd64.tar.gz"
chown root:root kustomize
mv kustomize /usr/local/bin/
kustomize version

find /bootstrap -type f -name '*.sh' | xargs chmod +x
systemctl enable bootstrap

systemctl enable socat-http
systemctl enable socat-https

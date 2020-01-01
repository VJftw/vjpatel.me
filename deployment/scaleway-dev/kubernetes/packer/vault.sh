#!/bin/bash -xe

apt-get update && apt-get install -y unzip libcap2-bin

cd /tmp
export VAULT_VERSION="1.3.0"
curl --remote-name https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip
unzip vault_${VAULT_VERSION}_linux_amd64.zip
chown root:root vault
mv vault /usr/local/bin/
vault --version

setcap cap_ipc_lock=+ep /usr/local/bin/vault
useradd --system --home /etc/vault.d --shell /bin/false vault

chmod 700 /etc/vault.d
chown -R vault:vault /etc/vault.d
chmod 640 /etc/vault.d/*

mkdir -p /opt/vault/data
chown -R vault:vault /opt/vault/data

systemctl enable vault

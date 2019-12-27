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

mkdir -p /etc/systemd/system
touch /etc/systemd/system/vault.service

cat << EOF > /etc/systemd/system/vault.service
[Unit]
Description="HashiCorp Vault - A tool for managing secrets"
Documentation=https://www.vaultproject.io/docs/
Requires=network-online.target
After=network-online.target
ConditionFileNotEmpty=/etc/vault.d/vault.hcl
StartLimitIntervalSec=60
StartLimitBurst=3

[Service]
User=vault
Group=vault
ProtectSystem=full
ProtectHome=read-only
PrivateTmp=yes
PrivateDevices=yes
SecureBits=keep-caps
AmbientCapabilities=CAP_IPC_LOCK
Capabilities=CAP_IPC_LOCK+ep
CapabilityBoundingSet=CAP_SYSLOG CAP_IPC_LOCK
NoNewPrivileges=yes
ExecStart=/usr/local/bin/vault server -config=/etc/vault.d/
ExecReload=/bin/kill --signal HUP $MAINPID
KillMode=process
KillSignal=SIGINT
Restart=on-failure
RestartSec=5
TimeoutStopSec=30
StartLimitInterval=60
StartLimitIntervalSec=60
StartLimitBurst=3
LimitNOFILE=65536
LimitMEMLOCK=infinity

[Install]
WantedBy=multi-user.target
EOF

mkdir --parents /etc/vault.d
chmod 750 /etc/vault.d
touch /etc/vault.d/vault.hcl /etc/vault.d/listener.hcl /etc/vault.d/storage.hcl
chown --recursive vault:vault /etc/vault.d
chmod 640 /etc/vault.d/vault.hcl
chmod 640 /etc/vault.d/listener.hcl
chmod 640 /etc/vault.d/storage.hcl

mkdir -p /opt/vault/data
chown -R vault:vault /opt/vault/data

cat << EOF > /etc/vault.d/vault.hcl
ui = true

storage "file" {
  path = "/opt/vault/data"
}
EOF

cat << EOF > /etc/vault.d/listener.hcl
listener "tcp" {
  address       = "127.0.0.1:8200"
  tls_disable   = true
}
EOF

cat << EOF > /etc/vault.d/storage.hcl
storage "file" {
  path = "/opt/vault/data"
}
EOF

systemctl enable vault

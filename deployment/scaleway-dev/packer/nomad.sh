#!/bin/bash -xe

apt-get update && apt-get install -y unzip

cd /tmp
export NOMAD_VERSION="0.10.2"
curl --remote-name https://releases.hashicorp.com/nomad/${NOMAD_VERSION}/nomad_${NOMAD_VERSION}_linux_amd64.zip
unzip nomad_${NOMAD_VERSION}_linux_amd64.zip
chown root:root nomad
mv nomad /usr/local/bin/
nomad version

mkdir -p /etc/systemd/system
touch /etc/systemd/system/nomad.service

cat << EOF > /etc/systemd/system/nomad.service
[Unit]
Description=Nomad
Documentation=https://nomadproject.io/docs/
Wants=network-online.target
After=network-online.target

[Service]
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/nomad agent -config /etc/nomad.d
KillMode=process
KillSignal=SIGINT
LimitNOFILE=infinity
LimitNPROC=infinity
Restart=on-failure
RestartSec=2
StartLimitBurst=3
StartLimitIntervalSec=10
TasksMax=infinity

[Install]
WantedBy=multi-user.target
EOF

mkdir -p /etc/nomad.d
chmod 700 /etc/nomad.d
touch /etc/nomad.d/nomad.hcl

cat << EOF > /etc/nomad.d/nomad.hcl
datacenter = "dc1"
data_dir = "/opt/nomad"
EOF

cat << EOF > /etc/nomad.d/server.hcl
server {
  enabled = true
  bootstrap_expect = 1
}

acl {
  enabled = true
}
EOF

cat << EOF > /etc/nomad.d/client.hcl
client {
  enabled = true
}
EOF

systemctl enable nomad

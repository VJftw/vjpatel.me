#!/bin/bash -xe

apt-get update && apt-get install -y unzip

cd /tmp
export NOMAD_VERSION="0.10.2"
curl --remote-name https://releases.hashicorp.com/nomad/${NOMAD_VERSION}/nomad_${NOMAD_VERSION}_linux_amd64.zip
unzip nomad_${NOMAD_VERSION}_linux_amd64.zip
chown root:root nomad
mv nomad /usr/local/bin/
nomad version

useradd --system --home /etc/nomad.d --shell /bin/false nomad
usermod -aG docker nomad

mkdir -p /opt/nomad
chmod 700 /opt/nomad
chown -R nomad:nomad /opt/nomad

chmod 700 /etc/nomad.d
chown -R nomad:nomad /etc/nomad.d
chmod 640 /etc/nomad.d/*

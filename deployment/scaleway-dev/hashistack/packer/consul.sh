#!/bin/bash -xe

apt-get update && apt-get install -y unzip

cd /tmp
export CONSUL_VERSION="1.6.2"
curl --remote-name https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip
unzip consul_${CONSUL_VERSION}_linux_amd64.zip
chown root:root consul
mv consul /usr/local/bin/
consul --version

useradd --system --home /etc/consul.d --shell /bin/false consul

mkdir -p /opt/consul
chmod 700 /opt/consul
chown -R consul:consul /opt/consul

chmod 700 /etc/consul.d
chown -R consul:consul /etc/consul.d
chmod 640 /etc/consul.d/*

#!/bin/bash -xe
# TODO: renew tls certs
# TODO: support use of intermediate CA for default trust

curl -L https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
  -o /usr/local/bin/wait-for-it.sh
chmod +x /usr/local/bin/wait-for-it.sh

chmod +x /bootstrap/*.sh
systemctl enable bootstrap

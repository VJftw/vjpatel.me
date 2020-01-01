#!/bin/bash -e

VAULT_HOST="127.0.0.1"
VAULT_PORT="8200"

BASE_DOMAIN="dev.vjpatel.me"
OIDC_DISCOVERY_URL="https://accounts.google.com"

VAULT_ENTITIES="
vj-patel:vj@vjpatel.me
"

VAULT_GROUPS="
admin:admin:vj-patel
"

hostname=$(hostname -f)
node_dev=$(ip route | grep "default via" | cut -f5 -d" ")
node_ip=$(ip addr | grep ${node_dev} | grep inet | sed 's/^.*inet \(.*\)\/.*$/\1/')
advertise_ip=${node_ip}

function pkiCerts {
  local pki_path=$1
  local role_name=$2
  local organisation=$3
  local common_name=$4
  local sans=$5
  local ip_sans=$6
  local f_owner=$7
  local dir=$8
  local filename=$9

  local allow_any_name="true"
  if echo "${common_name}" | grep "${BASE_DOMAIN}"; then
    allow_any_name="false"
  fi

  vault write "${pki_path}/roles/${role_name}" \
    allowed_domains="${BASE_DOMAIN}" \
    allow_subdomains=true \
    max_ttl=72h \
    allow_any_name=${allow_any_name} \
    organization="${organisation}" \
    enforce_hostnames=false \
    require_cn=false

  certs=$(vault write "${pki_path}/issue/${role_name}" \
    common_name="${common_name}" \
    alt_names="${sans}" \
    ip_sans="${ip_sans}" \
    -format=json
  )

  mkdir -p "${dir}"
  echo "${certs}" | jq -r '.data.certificate' > "${dir}/${filename}.crt"
  chmod 0666 "${dir}/${filename}.crt"
  echo "${certs}" | jq -r '.data.private_key' > "${dir}/${filename}.key"
  chmod 0400 "${dir}/${filename}.key"
  chown ${f_owner}:${f_owner} ${dir}/*
}

#!/bin/bash -e

/bootstrap/kubernetes/kubernetes.sh

/bootstrap/hashicorp-vault-auth/hashicorp-vault-auth.sh

/bootstrap/cert-manager/cert-manager.sh

/bootstrap/ingress-nginx/ingress-nginx.sh

/bootstrap/dashboard/dashboard.sh

#!/bin/bash -e

/bootstrap/kubernetes/kubernetes.sh && \
/bootstrap/kubernetes/hashicorp-vault-auth/hashicorp-vault-auth.sh && \
/bootstrap/kubernetes/cert-manager/cert-manager.sh && \
/bootstrap/kubernetes/ingress-nginx/ingress-nginx.sh && \
/bootstrap/kubernetes/dashboard/dashboard.sh && \
/bootstrap/kubernetes/setup-web/setup-web.sh

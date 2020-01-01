#!/bin/bash -e

source /bootstrap/config.sh

kustomize build /bootstrap/kubernetes/dashboard | kubectl apply -f-

# K3s w/ OIDC via Auth0

## Pre-requisites

* Install Krew on your workstation (https://krew.sigs.k8s.io/docs/user-guide/setup/install/)
* Install https://github.com/int128/kubelogin via `kubectl krew`

### Shell script

```
./k3s.sh \
  k3s.vjpatel.me \
  https://vjpatel.eu.auth0.com/ \
  PT1R4dJdij9LqJWJI3a3i1VcIcFXy5Lj \
  vj@vjpatel.me
```

# K3s on Scaleway

1. Install K3s without starting the server
```bash
export INSTALL_K3S_SKIP_START="true"
curl -sfL https://get.k3s.io | sh -
```

## Use Auth0 as an OIDC provider

1. write to `/var/lib/rancher/k3s/server/manifests/oidc-admin.yaml`
```yaml
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: oidc-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: Group
  name: oidc:admin
```

1. Configure K3s to use oidc from Auth0
```
k3s server \
  --tls-san k3s.vjpatel.me \
  --kube-apiserver-arg oidc-issuer-url=https://vjpatel.eu.auth0.com/ \
  --kube-apiserver-arg oidc-client-id=PT1R4dJdij9LqJWJI3a3i1VcIcFXy5Lj \
  --kube-apiserver-arg oidc-username-claim=email \
  --kube-apiserver-arg oidc-username-prefix=oidc: \
  --kube-apiserver-arg oidc-groups-claim=http://schemas.microsoft.com/ws/2008/06/identity/claims/role \
  --kube-apiserver-arg oidc-groups-prefix=oidc:
```

2. Install Krew on your workstation (https://krew.sigs.k8s.io/docs/user-guide/setup/install/)
3. Install https://github.com/int128/kubelogin via `kubectl krew`

```
kubectl config set-credentials default \
	  --exec-api-version=client.authentication.k8s.io/v1beta1 \
	  --exec-command=kubectl \
	  --exec-arg=oidc-login \
	  --exec-arg=get-token \
	  --exec-arg=--oidc-issuer-url=https://vjpatel.eu.auth0.com/ \
	  --exec-arg=--oidc-client-id=PT1R4dJdij9LqJWJI3a3i1VcIcFXy5Lj \
	  --exec-arg=--oidc-extra-scope=profile \
	  --exec-arg=--oidc-extra-scope=email

```

```
kubectl oidc-login setup \
  --oidc-issuer-url=https://vjpatel.eu.auth0.com/ \
  --oidc-client-id=PT1R4dJdij9LqJWJI3a3i1VcIcFXy5Lj \
  --oidc-extra-scope="profile" \
  --oidc-extra-scope="email"
```

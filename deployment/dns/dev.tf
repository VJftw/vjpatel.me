locals {
  ip = "51.158.67.77"
}

resource "aws_route53_record" "vault_a" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "vault.dev.vjpatel.me"
  type    = "A"
  ttl     = "300"

  records = ["${local.ip}"]

}


resource "aws_route53_record" "kubernetes_a" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "kubernetes.dev.vjpatel.me"
  type    = "A"
  ttl     = "300"

  records = ["${local.ip}"]
}


resource "aws_route53_record" "k8s_a" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "k8s.dev.vjpatel.me"
  type    = "A"
  ttl     = "300"

  records = ["${local.ip}"]
}

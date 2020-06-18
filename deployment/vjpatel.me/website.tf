module "cdn" {
  source               = "git::https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn.git?ref=0.23.1"
  
  namespace            = module.base_label.namespace
  stage                = module.base_label.stage
  tags                 = module.base_label.tags
  delimiter            = module.base_label.delimiter
  name                 = "website"

  aliases              = [local.domain, "www.${local.domain}"]
  parent_zone_name     = local.domain
  acm_certificate_arn  = module.acm.this_acm_certificate_arn
  allowed_methods      = ["GET", "HEAD", "OPTIONS"]
  compress             = true
  cached_methods       = ["GET", "HEAD", "OPTIONS"]
  encryption_enabled   = true
  error_document       = "/4xx.html"
  origin_force_destroy = true
  website_enabled      = true
  routing_rules        = <<EOF
[
  {
      "Redirect": {
          "ReplaceKeyWith": "index.html"
      },
      "Condition": {
          "KeyPrefixEquals": "/"
      }
  }
]
EOF
}

module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> v2.0"

  domain_name  = "vjpatel.me"
  zone_id      = data.aws_route53_zone.main.zone_id

  subject_alternative_names = [
    "www.vjpatel.me",
  ]
}

# resource "aws_acm_certificate" "website" {
#   domain_name       = local.domain
#   subject_alternative_names = [
#       "www.${local.domain}",
#   ]
#   validation_method = "DNS"
# }

# resource "aws_route53_record" "cert_validation" {
#   count = length(aws_acm_certificate.website.domain_validation_options)

#   name    = aws_acm_certificate.website.domain_validation_options.0.resource_record_name
#   type    = aws_acm_certificate.website.domain_validation_options.0.resource_record_type
#   zone_id = data.aws_route53_zone.main.zone_id
#   records = ["${aws_acm_certificate.website.domain_validation_options.0.resource_record_value}"]
#   ttl     = 60
# }

# resource "aws_acm_certificate_validation" "cert" {
#   certificate_arn         = aws_acm_certificate.website.arn
#   validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]
# }
# resource "aws_route53_record" "web_a" {
#   zone_id = data.aws_route53_zone.main.zone_id
#   name    = "vjpatel.me"
#   type    = "A"

#   alias {
#     name                   = "d1mc7rhc6swrfe.cloudfront.net."
#     zone_id                = "Z2FDTNDATAQYW2"
#     evaluate_target_health = false
#   }
# }

# resource "aws_route53_record" "web_aaaa" {
#   zone_id = data.aws_route53_zone.main.zone_id
#   name    = "vjpatel.me"
#   type    = "AAAA"

#   alias {
#     name                   = "d1mc7rhc6swrfe.cloudfront.net."
#     zone_id                = "Z2FDTNDATAQYW2"
#     evaluate_target_health = false
#   }
# }

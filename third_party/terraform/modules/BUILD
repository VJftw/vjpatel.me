subinclude("//plz/defs:terraform")

terraform_module(
    name = "terraform_aws_scm",
    url = "https://github.com/terraform-aws-modules/terraform-aws-acm/archive/v2.12.0.tar.gz",
    hashes = ["87e7872b0ba24e38258795b30b7f91f4a00bdf726618715086514e0b7608865c"],
    licences = ["Apache-2.0"],
    visibility = ["PUBLIC"],
)

terraform_module(
    name = "cloudposse_null_label",
    url = "https://github.com/cloudposse/terraform-null-label/archive/0.16.0.tar.gz",
    hashes = ["d089ace98e6fe963999dc91e70d92092067c64c546c2b85db19adb77ce6397d3"],
    licences = ["Apache-2.0"],
    visibility = ["PUBLIC"],
)

terraform_module(
    name = "cloudposse_aws_cloudfront_s3_cdn",
    url = "https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn/archive/0.23.1.tar.gz",
    hashes = ["1cdd9ab9e40280ffc5f19cb7cd2ba5ccf58c4f2b2b055d2b419db9dbda2f62cb"],
    licences = ["Apache-2.0"],
    visibility = ["PUBLIC"],
    deps = [
        ":cloudposse_null_label",
        ":cloudposse_aws_route53_alias",
        ":cloudposse_aws_s3_log_storage",
    ]
)

terraform_module(
    name = "cloudposse_aws_route53_alias",
    url = "https://github.com/cloudposse/terraform-aws-route53-alias/archive/0.4.0.tar.gz",
    hashes = ["9415a4c620bcf6e0c568f26399e793ead1d9347375b60dc766b71ddf263d6d54"],
    licences = ["Apache-2.0"],
    visibility = ["PUBLIC"],
)

terraform_module(
    name = "cloudposse_aws_s3_log_storage",
    url = "https://github.com/cloudposse/terraform-aws-s3-log-storage/archive/0.7.0.tar.gz",
    hashes = ["2c30665cce7709fceba40643e466fadb88262d56b82434c6ea8aba6596c3ca67"],
    licences = ["Apache-2.0"],
    visibility = ["PUBLIC"],
    deps = [
        ":cloudposse_null_label",
    ]
)

terraform_module(
    name = "cloudposse_aws_tfstate_backend",
    url = "https://github.com/cloudposse/terraform-aws-tfstate-backend/archive/0.17.0.tar.gz",
    hashes = ["e2ede67e49088d0e2b8bcba448e0952624cd1a0d53dc9d313b75fba675e49f9d"],
    licences = ["Apache-2.0"],
    visibility = ["PUBLIC"],
    deps = [
        ":cloudposse_null_label",
    ]
)

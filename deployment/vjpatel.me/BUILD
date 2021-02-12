subinclude("//third_party/defs:terraform")

terraform_root(
    name = "vjpatel.me",
    srcs = [
        "data.tf",
        "main.tf",
        "website.tf",
        "//deployment/vjpatelme-terraform-state:state",
    ],
    providers = [
        "//third_party/terraform/providers:aws",
        "//third_party/terraform/providers:null",
        "//third_party/terraform/providers:template",
        "//third_party/terraform/providers:local",
    ],
    modules = [
        "//third_party/terraform/modules:terraform_aws_scm",
        "//third_party/terraform/modules:cloudposse_null_label",
        "//third_party/terraform/modules:cloudposse_aws_cloudfront_s3_cdn",
    ]
)

subinclude("//plz/defs:terraform")

terraform(
    name = "vjpatel-terraform-state",
    srcs = [
        "main.tf",
    ],
    providers = [
        "//third_party/terraform/providers:aws",
        "//third_party/terraform/providers:null",
        "//third_party/terraform/providers:template",
        "//third_party/terraform/providers:local",
    ],
    modules = [
        "//third_party/terraform/modules:cloudposse_null_label",
        "//third_party/terraform/modules:cloudposse_aws_tfstate_backend",
    ],
)

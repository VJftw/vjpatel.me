subinclude("//third_party/defs:terraform")

terraform_root(
    name = "vjpatel-terraform-state",
    srcs = [
        "main.tf",
        ":state",
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

filegroup(
    name="state",
    srcs=["state.tf"],
    visibility=["//deployment/..."],
)

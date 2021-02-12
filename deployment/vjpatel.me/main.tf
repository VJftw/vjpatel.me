provider "aws" {
  region  = "us-east-1"
  version = "~> 2.43"
}

module "base_label" {
  source = "//third_party/terraform/modules:cloudposse_null_label"

  namespace  = "vjpatel.me"
  attributes = ["website"]
}

locals {
  domain = "vjpatel.me"
}

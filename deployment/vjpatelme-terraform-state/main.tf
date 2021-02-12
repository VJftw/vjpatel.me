provider "aws" {
  region  = "eu-west-1"
  version = "~> 2.43"
}

module "base_label" {
  source = "//third_party/terraform/modules:cloudposse_null_label"

  namespace = "vjpatel.me"
}

module "terraform_state_backend" {
  source = "//third_party/terraform/modules:cloudposse_aws_tfstate_backend"

  context    = module.base_label.context
  attributes = ["state"]
  region     = "eu-west-1"
}

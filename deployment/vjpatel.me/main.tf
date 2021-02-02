terraform {
  backend "s3" {
    region         = "eu-west-1"
    bucket         = "vjpatelme-terraform-state"
    key            = "vjpatel.me.tfstate"
    dynamodb_table = "vjpatelme-terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region  = "us-east-1"
  version = "~> 2.43"
}

module "base_label" {
  source    = "//third_party/terraform/modules:cloudposse_null_label"
  
  namespace = "vjpatel.me"
  attributes = ["website"]
}

locals {
    domain = "vjpatel.me"
}

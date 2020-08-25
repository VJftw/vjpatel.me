terraform {
  backend "s3" {
    region         = "eu-west-1"
    bucket         = "vjpatelme-terraform-state"
    key            = "state.tfstate"
    dynamodb_table = "vjpatelme-terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region  = "eu-west-1"
  version = "~> 2.43"
}

module "base_label" {
  source    = "git::https://github.com/cloudposse/terraform-null-label.git?ref=tags/0.16.0"
  
  namespace = "vjpatel.me"
}

module "terraform_state_backend" {
  source     = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=0.17.0"

  context    = module.base_label.context
  attributes = ["state"]
  region     = "eu-west-1"
}


terraform {
  backend "s3" {
    bucket = "tfstate-vjpatelme"
    key    = "dns"
    region = "eu-west-1"
  }
}

provider "aws" {
  region  = "eu-west-1"
  version = "~> 2.43"
}


data "aws_route53_zone" "main" {
  name = "vjpatel.me."
}

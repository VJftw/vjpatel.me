terraform {
  backend "s3" {
    region         = "eu-west-1"
    bucket         = "vjpatelme-terraform-state"
    key            = "$PKG.tfstate"
    dynamodb_table = "vjpatelme-terraform-state-lock"
    encrypt        = true
  }
}

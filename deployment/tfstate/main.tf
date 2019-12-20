terraform {
  backend "s3" {
    region = "eu-west-1"
    bucket = "tfstate-vjpatelme"
    key    = "state"
  }
}

provider "aws" {
  region  = "eu-west-1"
  version = "~> 2.43"
}


resource "aws_s3_bucket" "state" {
  bucket = "tfstate-vjpatelme"

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }

}

resource "aws_dynamodb_table" "state" {
  name           = "tfstate-vjpatelme"
  hash_key       = "LockID"
  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "LockID"
    type = "S"
  }

}

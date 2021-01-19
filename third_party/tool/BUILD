remote_file(
    name = "jq",
    url = "https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64",
)

TERRAFORM_VERSION = "0.12.30"

remote_file(
    name = "terraform",
    url = f"https://releases.hashicorp.com/terraform/{TERRAFORM_VERSION}/terraform_{TERRAFORM_VERSION}_linux_amd64.zip",
    hashes = [
        # "042f1f4fb47696b3442eca12bce7cce6de0b477b299503ddad6b8bc3777a54b5",
    ],
    binary = True,
    extract = True,
    visibility = ["PUBLIC"],
)

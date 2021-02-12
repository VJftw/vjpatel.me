subinclude(
    "//third_party/defs:terraform",
)

terraform_toolchain(
    name = "terraform_0_12",
    version = "0.12.30",
    hashes = ["a646b61232ac0c400ec8cc2c062f4e36b5a9e8515f11f7f5f61eb03fe058f18d"],
    visibility = ["PUBLIC"],
)

remote_file(
    name = "jq",
    url = "https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64",
    visibility = ["PUBLIC"],
    binary = True,
)

HUGO_VERSION = "0.80.0"

remote_file(
    name = "hugo",
    url = f"https://github.com/gohugoio/hugo/releases/download/v{HUGO_VERSION}/hugo_{HUGO_VERSION}_Linux-64bit.tar.gz",
    hashes = ["b3a259bbe633e2f9182f8ecfc1b5cee6a7cfc4c970defe5f29c9959f2ef3259b"],
    binary = True,
    extract = True,
    exported_files = ["hugo"],
    visibility = ["PUBLIC"],
)

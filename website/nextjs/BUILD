subinclude("//plz/defs:nodejs")

sh_cmd(
    name = "install",
    shell = "/bin/bash",
    data = ["//third_party/lang:nodejs_npm"],
    cmd = """
set -euo pipefail
ROOT=$(echo "$PWD" | sed 's#/plz-out/.*##g')
cd $PKG
"\\\${ROOT}/$(out_location //third_party/lang:nodejs_npm)" install
""",
)

scripts = [
    "dev", 
    "build", 
]

for script in scripts:
    sh_cmd(
        name = script,
        shell = "/bin/bash",
        data = ["//third_party/lang:nodejs_npm"],
        cmd = f"""
    set -euo pipefail
    ROOT=$(echo "$PWD" | sed 's#/plz-out/.*##g')
    cd $PKG
    "\\\${ROOT}/$(out_location //third_party/lang:nodejs_npm)" run {script}
    """,
    )

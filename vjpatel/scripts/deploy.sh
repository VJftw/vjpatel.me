#!/bin/bash -e

aws s3 rm s3://vjpatel.me --recursive

aws s3 cp dist/. s3://vjpatel.me --acl public-read --recursive --cache-control max-age=120

static_files=$(find dist/ -name '*.js' -o -name "*.css")
for static in $static_files; do
  dest_static="${static//dist\//}"
  echo "${dest_static}"
  aws s3 cp "${static}" "s3://vjpatel.me/${dest_static}" --acl public-read --cache-control max-age=31536000
done

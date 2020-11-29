#!/bin/bash

set -euo pipefail

bucket="s3://vjpatelme-website-origin"
dist="${PWD}/website/nextjs/out"

echo "-> clearing website"
aws s3 rm "${bucket}" --recursive

echo "-> uploading website"
aws s3 cp "${dist}/." "${bucket}" --acl public-read --recursive --cache-control max-age=120

echo "-> setting cache-control on static assets"
static_files=$(find "${dist}/" -name '*.js' -o -name "*.css")
for static in $static_files; do
  dest_static="${static//dist\//}"
  echo "${dest_static}"
  aws s3 cp "${static}" "${bucket}/${dest_static}" --acl public-read --cache-control max-age=31536000
done

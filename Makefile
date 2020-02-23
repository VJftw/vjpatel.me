AWS_DEFAULT_REGION ?= eu-west-1

sass:
	docker run --rm \
	--volume ${CURDIR}/vjpatel:/app \
	--workdir /app \
	node:13 \
	/bin/sh -c "npm install && npm run scss"

build: sass
	docker run --rm \
	--volume ${CURDIR}/vjpatel:/app \
	--workdir /app \
	registry.gitlab.com/pages/hugo/hugo_extended \
	hugo

deploy:
	docker run --rm \
	--volume ${CURDIR}/vjpatel:/app \
	--workdir /app \
	--env AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
	--env AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
	--env AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION} \
	anigeo/awscli:latest \
	s3 cp public/. s3://vjpatel.me --acl public-read --recursive --cache-control max-age=120

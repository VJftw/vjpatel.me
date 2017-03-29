FROM alpine:latest

RUN mkdir -p /app
VOLUME /app

ENV HUGO_VERSION=0.17

ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz /tmp/hugo.tar.gz

RUN tar -xvzf /tmp/hugo.tar.gz hugo_${HUGO_VERSION}_linux_amd64/hugo_${HUGO_VERSION}_linux_amd64
RUN mv /hugo_${HUGO_VERSION}_linux_amd64/hugo_${HUGO_VERSION}_linux_amd64 /bin/hugo

EXPOSE 1313

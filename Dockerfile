FROM alpine:latest

RUN apk --no-cache add \
    openssh-client \
    sshpass

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

WORKDIR /github/workspace

ENTRYPOINT ["/entrypoint.sh"]

#!/bin/sh

HOST=$1
USERNAME=$2
PASSWORD=$3
COMMAND=$4

sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$HOST "$COMMAND"

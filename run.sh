#!/bin/bash

FOLLOW_LOGS="$1"

docker-compose -f docker-compose.yml -f docker-compose.develop.yml down \
  && docker-compose -f docker-compose.yml -f docker-compose.develop.yml build \
  && docker-compose -f docker-compose.yml -f docker-compose.develop.yml up -d \
  && docker-compose -f docker-compose.yml -f docker-compose.develop.yml ps

if [ -n "$FOLLOW_LOGS" ]; then
  docker-compose -f docker-compose.yml -f docker-compose.develop.yml logs -f server
fi

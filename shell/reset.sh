#!/usr/bin/env bash
service=$1

docker-compose stop

for service in "$@"
do
  docker-compose rm -v -s -f ${service}
  docker volume ls | grep ${service}_data | awk '{print $2}' | xargs docker volume remove
done

docker-compose up -d

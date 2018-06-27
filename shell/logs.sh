#!/usr/bin/env bash
docker-compose ps | grep _$1_ | cut -d' ' -f1 | xargs docker logs --tail 100 -f

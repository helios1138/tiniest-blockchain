#!/usr/bin/env bash
docker-compose exec migration yarn migrate $@

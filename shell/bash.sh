#!/usr/bin/env bash
service=$1
shift
docker-compose exec ${service} bash

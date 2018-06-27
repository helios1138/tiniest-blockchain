#!/usr/bin/env bash
yarn config set cache-folder /yarn_cache
yarn --mutex file:/yarn_cache/mutex
if [ ${INSPECT_ENABLED} ]
then
  node --inspect=0.0.0.0:9000 run
else
  nodemon run
fi

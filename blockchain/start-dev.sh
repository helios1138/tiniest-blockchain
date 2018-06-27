#!/usr/bin/env bash
yarn config set cache-folder /yarn_cache
yarn --mutex file:/yarn_cache/mutex
nodemon run

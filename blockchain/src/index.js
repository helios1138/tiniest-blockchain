import './core/logger/prettifyConsoleLog'

import { serve } from './core/server/serve'
import { setup as setupGraphQL } from './core/graphql/setup'
import * as api from './api'
import { instance } from './core/singleton/singleton'
import { main } from './core/main/main'
import { Mongodb } from './core/mongodb/mongodb'

main(async () => {
  await instance(Mongodb).connect()

  serve(app => {
    setupGraphQL(app, api)
  })
})

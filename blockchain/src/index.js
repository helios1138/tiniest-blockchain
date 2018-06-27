import './core/logger/prettifyConsoleLog'

import * as server from './core/server/serve'
import * as graphql from './core/graphql/setup'
import * as api from './api'

server.serve(app => {
  graphql.setup(app, api)
})

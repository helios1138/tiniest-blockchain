import './core/logger/prettifyConsoleLog'

import { serve } from './core/server/serve'
import { setup } from './core/graphql/setup'
import * as api from './api'

serve(app => {
  setup(app, api)
})

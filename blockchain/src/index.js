import './core/logger/prettifyConsoleLog'

import { serve } from './core/server/serve'
import { setup } from './core/graphql/setup'
import * as api from './api'
import { instance } from './core/singleton/singleton'
import { Consensus } from './consensus/consensus'

serve(app => {
  setup(app, api)
})

instance(Consensus).start()

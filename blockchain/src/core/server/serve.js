import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import { createLogger } from '../logger/createLogger'

const logger = createLogger('server')

export const serve = setup => {
  const app = express()

  app.use(compression())
  app.use(bodyParser.json())
  app.use(cors())

  setup(app)
  logger.info('setup success')

  app.listen(3000)
  logger.info('serving on port', 3000)
}

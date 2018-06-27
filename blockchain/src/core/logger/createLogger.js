import R from 'ramda'

import { levels } from './levels'
import { config } from '../config/config'
import { ConsoleWriter } from './ConsoleWriter'

const consoleWriter = config.has('logger.consoleWriterMinLevel') && ConsoleWriter({
  minLevel: config.get('logger.consoleWriterMinLevel'),
})

const log = ({ category, level }) => (...body) => {
  const time = Date.now()
  body = body.map(item => (item instanceof Error) ? R.pick(['name', 'message', 'stack'], item) : item)

  if (consoleWriter) {
    consoleWriter.writeBuffered({ time, category, level, body })
  }
}

export const createLogger = category => R.pipe(
  R.toPairs,
  R.map(R.prop(0)),
  R.map(level => ({ [level]: log({ category, level }) })),
  R.mergeAll,
)(levels)

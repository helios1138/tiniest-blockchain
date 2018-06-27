import clc from 'cli-color'
import moment from 'moment'
import util from 'util'

import { levels } from './levels'

const colors = [
  'blue',
  'yellowBright',
  'cyan',
  'magentaBright',
  'red',
  'green',
  'white',
  'cyanBright',
  'greenBright',
  'magenta',
]

const colorize = (level, string) => {
  switch (level) {
    case 'debug':
      return clc.cyanBright(string)

    case 'warn':
      return clc.yellow(string)

    case 'error':
      return clc.red(string)

    default:
      return string
  }
}

const getKeyHash = key => {
  key = key.split(':')[0]

  let hash = 0

  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i) * (i + 1)
  }

  return hash
}

const pickColor = key => colors[getKeyHash(key) % colors.length]

export const ConsoleWriter = ({ minLevel }) => {
  const buffer = []
  const state = { timeout: null }

  const prepareOutput = ({ time, category, level, body }) => {
    const output = body
      .map(item =>
        (typeof item === 'string')
          ? colorize(level, item)
          : (
            (item && item.stack)
              ? colorize(level, item.stack)
              : util.inspect(item, { depth: null, colors: true })
          ),
      )

    output.unshift(
      `${colorize(level, moment(time).format('DD.MM.YY HH:mm:ss.SSS'))} | ` +
      `${clc[pickColor(category)](category)} |`,
    )

    return output.join(' ')
  }

  const write = args => {
    const output = Array.isArray(args)
      ? args.map(prepareOutput)
      : [prepareOutput(args)]

    process.stdout.write(`${output.join('\n')}\n`)
  }

  const writeBuffered = args => {
    if (levels[args.level] > levels[minLevel]) {
      return
    }

    buffer.push(args)

    scheduleDrain()
  }

  const scheduleDrain = () => {
    if (!state.timeout) {
      state.timeout = setTimeout(() => {
        state.timeout = null
        setImmediate(drainBuffer)
      }, 200)
    }
  }

  const drainBuffer = () => {
    if (buffer.length > 0) {
      write(buffer)
      buffer.length = 0
    }
  }

  const init = () => {
    process.on('exit', drainBuffer)
  }

  init()

  return Object.freeze({
    writeBuffered,
  })
}

import { createLogger } from '../logger/createLogger'

const logger = createLogger(`main:${process.pid}`)

let called = false

export const main = execute => {
  const onExit = err => {
    if (err) {
      if (err.alreadyHandled) {
        return
      }

      logger.error(err)
    }

    logger.info('shutting down')
    setTimeout(process.exit, 1000)
  }

  if (called) {
    logger.error('you can only call main() once')
    onExit()
  }

  called = true

  logger.info('starting')

  try {
    Promise.resolve(execute())
      .catch(onExit)
  }
  catch (e) {
    onExit(e)
  }

  process.stdin.resume()

  process.on('SIGINT', onExit)
  process.on('uncaughtException', onExit)
  process.on('unhandledRejection', onExit)
}

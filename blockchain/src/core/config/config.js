import path from 'path'
import R from 'ramda'
import { isPlainObject } from 'lodash'
import fs from 'fs'

const loadConfigValues = (filePath, extending = false) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${extending ? '> extending' : 'loading'} config ${filePath}`)
  }

  const { _extends, ...values } = require(filePath)

  if (_extends) {
    const parentFile = path.resolve(path.dirname(filePath), _extends)

    return R.mergeDeepRight(
      loadConfigValues(parentFile, true),
      values,
    )
  } else {
    return values
  }
}

const configPath = name => path.resolve('./src/config', name)

const localConfigFileName = 'config-local.json'
const localConfigExampleFileName = 'config-local.example.json'

if (!fs.existsSync(configPath(localConfigFileName))) {
  fs.copyFileSync(configPath(localConfigExampleFileName), configPath(localConfigFileName))
}

const configFileName = (process.env.NODE_ENV === 'test')
  ? 'config-test.json'
  : (process.env.CONFIG || localConfigFileName)

const configValues = loadConfigValues(configPath(configFileName))

const extractEnvVariable = value => {
  const envPath = value.split('.').slice(1).join('.')
  const envValue = process.env[envPath]

  if (envValue === undefined) {
    throw new Error(`Environment variable \`${envPath}\` is not defined`)
  }

  return envValue
}

const resolve = R.cond([
  [R.both(R.is(String), R.startsWith('$env.')), extractEnvVariable],
  [R.T, R.identity],
])

export const config = Object.freeze({
  has: key => R.pipe(
    R.path(key.split('.')),
    R.compose(R.not, R.isNil),
  )(configValues),

  get: (key, defaultValue) => {
    const value = R.path(key.split('.'), configValues)

    if (isPlainObject(value)) {
      throw new Error(`Config value \`${key}\` is an object. Accessing object values in config is not allowed`)
    }

    if (value !== undefined) {
      return resolve(value)
    }

    if (defaultValue !== undefined) {
      return resolve(defaultValue)
    }

    throw new Error(`Config value \`${key}\` is not defined`)
  },
})

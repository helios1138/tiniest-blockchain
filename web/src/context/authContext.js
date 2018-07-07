import { withProps, withStateHandlers, compose } from 'recompose'
import forge from 'node-forge'
import { provideContext } from '../hoc/context'

export const authContext = provideContext('auth', compose(
  withStateHandlers({
    privateKey: null,
    publicKey: null,
  }, {
    setKeyPair: () => ({ publicKey, privateKey }) => ({ publicKey, privateKey }),
  }),
  withProps(({ privateKey, setKeyPair }) => ({
    getSignature: () => {
      const timestamp = Date.now()
      const signature = forge.ed25519
        .sign({
          message: Buffer.from('' + timestamp),
          privateKey: Buffer.from(privateKey, 'base64'),
        })
        .toString('base64')

      return JSON.stringify({ timestamp, signature })
    },
    logOut: () => setKeyPair({}),
  })),
), [
  'privateKey',
  'publicKey',
  'setKeyPair',
  'getSignature',
  'logOut',
])

import React from 'react'
import forge from 'node-forge'
import { withStateHandlers, compose, withProps } from 'recompose'
import { ApolloProvider } from 'react-apollo'

import { provideContext } from '../hoc/context'
import { Authentication } from './Authentication'
import { Home } from './Home'
import { apolloClient } from '../apollo/client'

@provideContext('auth', compose(
  withStateHandlers({
    privateKey: null,
    publicKey: null,
  }, {
    setKeyPair: () => ({ publicKey, privateKey }) => ({ publicKey, privateKey }),
  }),
  withProps(({ privateKey }) => ({
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
  })),
), [
  'privateKey',
  'publicKey',
  'setKeyPair',
  'getSignature',
])
export class Root extends React.Component {
  render () {
    const { auth } = this.props

    return (
      <ApolloProvider client={apolloClient}>
        {auth.privateKey ? (
          <Home />
        ) : (
          <Authentication />
        )}
      </ApolloProvider>
    )
  }
}

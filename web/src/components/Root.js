import React from 'react'
import { withStateHandlers } from 'recompose'
import { ApolloProvider } from 'react-apollo'

import { provideContext } from '../hoc/context'
import { Authentication } from './Authentication'
import { Home } from './Home'
import { apolloClient } from '../apollo/client'

@provideContext('auth', withStateHandlers({
  privateKey: null,
  publicKey: null,
}, {
  setKeyPair: () => ({ publicKey, privateKey }) => ({ publicKey, privateKey }),
}), [
  'privateKey',
  'publicKey',
  'setKeyPair',
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

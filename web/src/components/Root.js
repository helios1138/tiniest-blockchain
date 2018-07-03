import React from 'react'
import { ApolloProvider } from 'react-apollo'

import { Authentication } from './Authentication'
import { Home } from './Home'
import { apolloClient } from '../apollo/client'
import { authContext } from '../context/authContext'

@authContext
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

import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { compose } from 'recompose'

import { Authentication } from './Authentication'
import { Home } from './Home'
import { apolloClient } from '../apollo/client'
import { authContext } from '../context/authContext'
import { styles } from '../hoc/styles'
import { Flex } from './shared/Flex'

export const Root = compose(
  authContext,
  styles('Root', {
    root: {
      height: '100%',
      fontFamily: 'sans-serif',
      fontSize: 14,
      color: '#444',
    },
  }),
)(({ auth: { privateKey }, classes }) => (
  <ApolloProvider client={apolloClient}>
    <Flex className={classes.root}>
      <BrowserRouter>
        <Switch>
          <Route path="/authentication"
                 render={() => !privateKey ? (
                   <Authentication />
                 ) : (
                   <Redirect to={{ pathname: '/' }} />
                 )} />
          <Route path="/"
                 render={() => privateKey ? (
                   <Home />
                 ) : (
                   <Redirect to={{ pathname: '/authentication' }} />
                 )} />
        </Switch>
      </BrowserRouter>
    </Flex>
  </ApolloProvider>
))

import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { Authentication } from './Authentication'
import { Home } from './Home'
import { apolloClient } from '../apollo/client'
import { authContext } from '../context/authContext'
import { styles } from '../hoc/styles'

@authContext
@styles({
  root: {
    display: 'flex',
    height: '100%',
  },
})
export class Root extends React.Component {
  render () {
    const { auth: { privateKey }, classes } = this.props

    return (
      <ApolloProvider client={apolloClient}>
        <div className={classes.root}>
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
        </div>
      </ApolloProvider>
    )
  }
}

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import * as R from 'ramda'
import * as rc from 'recompose'

import { consumeContext } from '../hoc/context'

export const Header = rc.compose(
  consumeContext('auth'),
  graphql(gql`
    query balance ($address: String!) {
      balance (address: $address)
    }
  `, {
    options: ({ auth: { publicKey } }) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        address: publicKey,
      },
      pollInterval: 1000,
    }),
    props: R.applySpec({
      balance: R.pathOr(0, ['data', 'balance']),
    }),
  }),
  graphql(gql`
    mutation mine ($miner: String!) {
      mine (miner: $miner) {
        index
      }
    }
  `, {
    props: ({ ownProps: { auth: { publicKey } }, mutate }) => ({
      mine: () => mutate({ variables: { miner: publicKey } }),
    }),
  }),
)(({ balance, auth, mine }) => (
  <div>
    address: {auth.publicKey},
    balance: {balance / 10000}
    <button onClick={mine}>mine</button>
  </div>
))

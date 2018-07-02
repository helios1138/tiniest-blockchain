import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import * as R from 'ramda'
import { compose, withProps } from 'recompose'

import { consumeContext } from '../hoc/context'

export const Header = compose(
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
  graphql(gql`
    mutation send ($transaction: TransactionInput!) {
      addTransaction (transaction: $transaction) { amount }
    }
  `, {
    props: ({ ownProps: { auth: { publicKey } }, mutate }) => ({
      send: ({ to, amount }) => mutate({
        variables: {
          transaction: {
            from: publicKey,
            to,
            amount,
          },
        },
      }),
    }),
  }),
  withProps(({ auth }) => ({
    logOut: () => auth.setKeyPair({}),
  })),
)(({ balance, auth, mine, logOut, send }) => (
  <div>
    address: {auth.publicKey},
    balance: {balance / 10000}
    <button onClick={mine}>mine</button>
    <button onClick={logOut}>logout</button>
    <button onClick={() => {
      send({ to: 'some', amount: 500 })
    }}>
      send
    </button>
  </div>
))

import React from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import * as R from 'ramda'

import { Flex } from './shared/Flex'
import { styles } from '../hoc/styles'
import { consumeContext } from '../hoc/context'
import { Address } from './shared/Address'

const transactionsQuery = graphql(gql`
  query transactions ($address: String!) {
    transactions (address: $address) {
      from
      to
      amount
    }
  }
`, {
  options: ({ auth: { publicKey } }) => ({
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000,
    variables: {
      address: publicKey,
    },
  }),
  props: R.applySpec({
    transactions: R.pathOr([], ['data', 'transactions']),
  }),
})

const style = styles('TransactionList', {
  list: {
    overflow: 'auto',
  },
  transaction: {
    padding: [5, 0],
    borderBottom: [3, 'dashed', '#999'],
    '&:last-child': {
      borderBottom: 'none',
    },
    '& > *': {
      margin: [0, 5],
    },
  },
  block: {
    '& > *': {
      margin: [3, 5],
    },
  },
})

const render = ({ classes, transactions }) => (
  <Flex flex={1}
        vertical>
    Transactions:
    <Flex vertical
          flex="1 0 0"
          className={classes.list}>
      {transactions.map(({ from, to, amount }, i) => (
        <Flex key={i}
              className={classes.transaction}
              vertical>
          <Flex className={classes.block}
                alignVertical="center">
            From: <Address>{from}</Address>
          </Flex>
          <Flex className={classes.block}
                alignVertical="center">
            To: <Address>{to}</Address>
          </Flex>
          <Flex className={classes.block}
                alignVertical="center">
            Amount: {amount / 10000}
          </Flex>
        </Flex>
      ))}
    </Flex>
  </Flex>
)

export const TransactionList = compose(
  consumeContext('auth'),
  transactionsQuery,
  style,
)(render)

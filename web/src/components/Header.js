import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import * as R from 'ramda'
import { compose } from 'recompose'

import { consumeContext } from '../hoc/context'
import { Flex } from './shared/Flex'
import { styles } from '../hoc/styles'
import { Address } from './shared/Address'
import { Button } from './shared/Button'
import { MineButton } from './MineButton'

const balanceQuery = graphql(gql`
  query balance ($address: String!) {
    balance (address: $address)
  }
`, {
  options: ({ auth: { publicKey } }) => ({
    pollInterval: 1000,
    fetchPolicy: 'cache-and-network',
    variables: {
      address: publicKey,
    },
  }),
  props: R.applySpec({
    balance: R.pathOr(0, ['data', 'balance']),
  }),
})

const style = styles('Header', {
  root: {
    padding: [10, 0],
    marginBottom: 10,
    borderBottom: [2, 'solid', '#999'],
  },
  block: {
    '& > *': {
      margin: 5,
    },
  },
})

const render = ({ classes, balance, auth }) => (
  <Flex className={classes.root}
        align="space-between">
    <Flex className={classes.block}
          alignVertical="center">
      Address: <Address>{auth.publicKey}</Address>
    </Flex>
    <Flex className={classes.block}
          alignVertical="center">
      <MineButton />
      Balance: {balance / 10000}
      <Button onClick={auth.logOut}>Log out</Button>
    </Flex>
  </Flex>
)

export const Header = compose(
  consumeContext('auth'),
  balanceQuery,
  style,
)(render)

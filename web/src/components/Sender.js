import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import { compose, withStateHandlers, withProps } from 'recompose'

import { consumeContext } from '../hoc/context'
import { styles } from '../hoc/styles'
import { Flex } from './shared/Flex'
import { Address } from './shared/Address'
import { Input } from './shared/Input'
import { Button } from './shared/Button'

const state = withStateHandlers({
  to: '',
  amount: 0,
}, {
  setTo: () => to => ({ to }),
  setAmount: () => amount => ({ amount }),
  reset: () => () => ({ to: '', amount: 0 }),
})

const sendMutation = graphql(gql`
  mutation send ($transaction: TransactionInput!) {
    addTransaction (transaction: $transaction) { amount }
  }
`, {
  options: ({ auth: { getSignature } }) => ({
    context: {
      headers: {
        get signature () { return getSignature() },
      },
    },
  }),
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
})

const style = styles('Sender', {
  block: {
    '& > *': {
      margin: 5,
    },
  },
  input: {
    flex: 1,
  },
})

const actions = withProps(({
  setTo,
  value,
  setAmount,
  to,
  amount,
  send,
  reset,
}) => ({
  onToChanged: ({ target: { value } }) => setTo(value),
  onAmountChanged: ({ target: { value } }) => setAmount(value),
  send: () => {
    send({ to, amount: amount * 10000 })
    reset()
  },
}))

const render = ({ classes, auth, to, amount, onToChanged, onAmountChanged, send }) => (
  <Flex vertical>
    Send coins:
    <Flex vertical>
      <Flex className={classes.block}
            alignVertical="center">
        From:
        <Address>{auth.publicKey}</Address>
      </Flex>
      <Flex className={classes.block}
            alignVertical="center">
        To:
        <Input value={to}
               onChange={onToChanged}
               className={classes.input} />
      </Flex>
      <Flex className={classes.block}
            alignVertical="center">
        Amount:
        <Input value={amount}
               onChange={onAmountChanged}
               type="number"
               className={classes.input} />
        <Button disabled={!to || !amount}
                onClick={send}>
          Send
        </Button>
      </Flex>
    </Flex>
  </Flex>
)

export const Sender = compose(
  consumeContext('auth'),
  sendMutation,
  state,
  actions,
  style,
)(render)

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import { compose, withStateHandlers } from 'recompose'

import { consumeContext } from '../hoc/context'
import { Button } from './shared/Button'

const state = withStateHandlers({
  inProgress: false,
}, {
  setInProgress: () => inProgress => ({ inProgress }),
})

const mineMutation = graphql(gql`
  mutation mine ($miner: String!) {
    mine (miner: $miner) {
      index
    }
  }
`, {
  options: ({ auth: { getSignature } }) => ({
    context: {
      headers: {
        get signature () { return getSignature() },
      },
    },
  }),
  props: ({ ownProps: { auth: { publicKey }, inProgress, setInProgress }, mutate }) => ({
    mine: async () => {
      setInProgress(true)

      await mutate({ variables: { miner: publicKey } })

      setInProgress(false)
    },
  }),
})

const render = ({ mine, inProgress }) => (
  <Button onClick={mine}
          disabled={inProgress}>
    {
      inProgress
        ? 'Mining in progress...'
        : 'Mine'
    }
  </Button>
)

export const MineButton = compose(
  state,
  consumeContext('auth'),
  mineMutation,
)(render)

import React from 'react'
import { compose } from 'recompose'

import { Header } from './Header'
import { Flex } from './shared/Flex'
import { styles } from '../hoc/styles'
import { TransactionList } from './TransactionList'
import { Sender } from './Sender'

const style = styles('Home', {
  root: {
    padding: [0, 25],
  },
  container: {
    '& > *': {
      margin: [0, 10],
    },
  },
})

const render = ({ classes }) => (
  <Flex flex={1}
        vertical
        className={classes.root}>
    <Header />
    <Flex flex={1}
          className={classes.container}>
      <TransactionList />
      <Sender />
    </Flex>
  </Flex>
)

export const Home = compose(
  style,
)(render)

import R from 'ramda'

import { instance } from '../core/singleton/singleton'
import { Blocks } from '../blocks/blocks'
import { verify } from '../verification/verify'

export const Transactions = () => {
  const transactions = []

  const getBalance = address => (address === 'network') ? Infinity : R.pipe(
    () => [
      instance(Blocks).getTransactions(),
      transactions,
    ],
    R.flatten,
    R.reduce((balance, { from, to, amount }) => {
      if (from === address) {
        return balance - amount
      } else if (to === address) {
        return balance + amount
      } else {
        return balance
      }
    }, 0),
  )()

  const add = (transaction, ctx) => {
    if (!verify(transaction.from, ctx)) {
      throw new Error('address not verified')
    }

    const { from, amount } = transaction
    const balance = getBalance(from)

    if (amount > balance) {
      throw new Error('amount bigger than balance')
    }

    transactions.push(transaction)
  }

  const list = () => transactions

  const clear = () => { transactions.length = 0 }

  return Object.freeze({
    add,
    list,
    clear,
    getBalance,
  })
}

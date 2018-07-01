import R from 'ramda'

import { instance } from '../core/singleton/singleton'
import { Chain } from '../chain/chain'

export const Transactions = () => {
  const chain = instance(Chain)

  const list = R.pipeP(
    chain.listBlocks,
    R.map(R.prop('transactions')),
    R.flatten,
    R.concat(R.__, chain.getPendingTransactions()),
  )

  const reduceBalance = address => (balance, { from, to, amount }) =>
    (from === address)
      ? balance - amount
      : (to === address)
      ? balance + amount
      : balance

  const getBalance = address => R.pipeP(list, R.reduce(reduceBalance(address), 0))()

  const add = async (transaction) => {
    const { from, amount } = transaction
    const balance = await getBalance(from)

    if (amount > balance) {
      throw new Error('transaction amount bigger than balance')
    }

    chain.addPendingTransaction(transaction)

    return transaction
  }

  return Object.freeze({
    list,
    add,
    getBalance,
  })
}

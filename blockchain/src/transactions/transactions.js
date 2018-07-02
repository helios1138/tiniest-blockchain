import R from 'ramda'

import { instance } from '../core/singleton/singleton'
import { Chain } from '../chain/chain'

export const Transactions = () => {
  const chain = instance(Chain)

  const list = address => R.pipeP(
    // todo: also add filter here
    chain.listBlocks,
    R.map(R.prop('transactions')),
    R.flatten,
    R.concat(R.__, chain.getPendingTransactions()),
    address ? (
      R.filter(R.either(
        R.propEq('from', address),
        R.propEq('to', address),
      ))
    ) : R.identity,
  )()

  const reduceBalance = address => (balance, { from, to, amount }) =>
    (from === address)
      ? balance - amount
      : (to === address)
      ? balance + amount
      : balance

  const getBalance = address => R.pipeP(list, R.reduce(reduceBalance(address), 0))()

  const add = async (transaction) => {
    const { from, to, amount } = transaction

    if (from === to) {
      throw new Error('transaction to yourself is not allowed')
    } else if (amount > await getBalance(from)) {
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

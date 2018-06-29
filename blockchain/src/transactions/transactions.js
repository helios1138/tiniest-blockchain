export const Transactions = () => {
  const transactions = []

  const add = transaction => { transactions.push(transaction) }

  const list = () => transactions

  const clear = () => { transactions.length = 0 }

  return Object.freeze({
    add,
    list,
    clear,
  })
}

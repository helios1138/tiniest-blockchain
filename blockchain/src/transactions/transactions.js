export const Transactions = () => {
  const transactions = []

  const add = transaction => {
    transactions.push(transaction)
  }

  const list = () => transactions

  return Object.freeze({
    add,
    list,
  })
}

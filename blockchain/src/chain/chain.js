import crypto from 'crypto'

import { instance } from '../core/singleton/singleton'
import { Mongodb } from '../core/mongodb/mongodb'

export const Chain = () => {
  const chain = instance(Mongodb).getConnection().db().collection('chain')
  const pendingTransactions = []

  const solveBlock = block => {
    const solution = {}

    for (; ;) {
      solution.solution = '' + Math.random()
      solution.hash = crypto
        .createHash('sha256')
        .update('' + block.index)
        .update('' + block.timestamp)
        .update(JSON.stringify(block.transactions))
        .update(block.prevHash)
        .update(solution.solution)
        .digest('hex')

      if (solution.hash.startsWith('00000')) {
        break
      }
    }

    return { ...block, ...solution }
  }

  const createRootBlock = () =>
    chain.insertOne({
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      prevHash: '',
      solution: '',
      hash: '',
    })

  const listBlocks = async () => {
    const blocks = await chain
      .find()
      .sort({ index: 1 })
      .toArray()

    if (blocks.length === 0) {
      await createRootBlock()
      return listBlocks()
    }

    return blocks
  }

  const getLastBlock = async () => {
    const lastBlock = await chain
      .find()
      .sort({ index: -1 })
      .limit(1)
      .toArray()
      .then(([block]) => block)

    if (!lastBlock) {
      await createRootBlock()
      return getLastBlock()
    }

    return lastBlock
  }

  const mineBlock = async miner => {
    const lastBlock = await getLastBlock()

    const newBlock = solveBlock({
      index: lastBlock.index + 1,
      timestamp: Date.now(),
      transactions: [...pendingTransactions, {
        from: 'network',
        to: miner,
        amount: 10000,
      }],
      prevHash: lastBlock.hash,
    })

    await chain.insertOne(newBlock)

    pendingTransactions.length = 0

    return newBlock
  }

  const getPendingTransactions = () => pendingTransactions

  const addPendingTransaction = transaction => { pendingTransactions.push(transaction) }

  return Object.freeze({
    listBlocks,
    mineBlock,
    getPendingTransactions,
    addPendingTransaction,
  })
}

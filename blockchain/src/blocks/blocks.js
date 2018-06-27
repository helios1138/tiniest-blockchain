import crypto from 'crypto'
import R from 'ramda'

export const Blocks = () => {
  const data = { chain: [] }

  const create = ({
    index,
    timestamp,
    data,
    prevHash,
  }) => ({
    index,
    timestamp,
    data,
    prevHash,
    hash: crypto
      .createHash('sha256')
      .update('' + index)
      .update('' + timestamp)
      .update(JSON.stringify(data))
      .update(prevHash)
      .digest('hex'),
  })

  const createRoot = () => create({
    index: 0,
    timestamp: Date.now(),
    data: { root: 1, proofOfWork: 1 },
    prevHash: '0',
  })

  const createNext = ({ index, hash }, data) => create({
    index: index + 1,
    timestamp: Date.now(),
    data,
    prevHash: hash,
  })

  const getChain = () => {
    if (data.chain.length === 0) {
      data.chain.push(createRoot())
    }

    return data.chain
  }

  const addToChain = block => {
    data.chain.push(block)
  }

  const proofOfWork = lastProof => {
    let proof = lastProof + 1

    while (!(proof % 9 === 0 && proof % lastProof === 0)) {
      proof++
    }

    return proof
  }

  const mine = () => {
    const lastBlock = R.last(getChain())
    const lastProof = lastBlock.data.proofOfWork

    const proof = proofOfWork(lastProof)

    const block = createNext(lastBlock, {
      proofOfWork: proof,
    })

    addToChain(block)

    return block
  }

  return Object.freeze({
    getChain,
    mine,
  })
}

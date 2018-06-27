import crypto from 'crypto'

import './prettifyConsoleLog'

const Block = ({ index, timestamp, data, prevHash }) => {
  const hash = () => crypto
    .createHash('sha256')
    .update('' + index)
    .update('' + timestamp)
    .update(data)
    .update(prevHash)
    .digest('hex')

  return Object.freeze({
    index,
    timestamp,
    data,
    prevHash,
    hash: hash(),
  })
}

const genesisBlock = () => Block({
  index: 0,
  timestamp: Date.now(),
  data: 'Genesis',
  prevHash: '0',
})

const nextBlock = prevBlock => Block({
  index: prevBlock.index + 1,
  timestamp: Date.now(),
  data: `Hey! I'm block ${prevBlock.index + 1}`,
  prevHash: prevBlock.hash,
})

const blockChain = [genesisBlock()]

for (let i = 0; i < 20; i++) {
  const block = nextBlock(blockChain[blockChain.length - 1])
  blockChain.push(block)
}

console.log(blockChain)

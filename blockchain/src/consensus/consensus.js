import R from 'ramda'

import { request } from '../core/graphql/request'
import { instance } from '../core/singleton/singleton'
import { Blocks } from '../blocks/blocks'
import { createLogger } from '../core/logger/createLogger'

export const Consensus = () => {
  const blocks = instance(Blocks)
  const logger = createLogger('Consensus')

  // language=GraphQL
  const queries = {
    chain: `
      query chain {
        chain {
          index
          timestamp
          data {
            transactions {
              from
              to
              amount
            }
            proofOfWork
          }
          prevHash
          hash
        }
      }
    `,
  }

  const requestPeerChain = i =>
    request(`http://tiniest-blockchain_blockchain_${i}:3000/graphql`, queries.chain)
      .catch(() => null)

  const getLongestPeerChain = R.pipeP(
    async () => R.range(0, 10),
    R.map(R.add(1)),
    R.map(requestPeerChain),
    ::Promise.all,
    R.reject(R.isNil),
    R.map(R.path(['data', 'chain'])),
    R.reduce(R.maxBy(R.length), blocks.getChain()),
  )

  const checkPeerChains = async () => {
    const longestChain = await getLongestPeerChain()

    if (longestChain.length > blocks.getChain().length) {
      logger.info('longer chain found, accepting')
      blocks.setChain(longestChain)
    }
  }

  const start = () => {
    setInterval(checkPeerChains, 5000)
  }

  return Object.freeze({
    start,
  })
}

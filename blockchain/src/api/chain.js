import { instance } from '../core/singleton/singleton'
import { Chain } from '../chain/chain'

export const chain = {
  // language=GraphQL Schema
  types: `
    type Block {
      index: Int!
      timestamp: Date!
      transactions: [Transaction!]!
      prevHash: String!
      solution: String!
      hash: String!
    }

    extend type Query {
      chain: [Block!]!
    }

    extend type Mutation {
      mine (miner: String!): Block!
    }
  `,
  resolvers: {
    Query: {
      chain: () => instance(Chain).listBlocks(),
    },
    Mutation: {
      mine: (_, { miner }) => instance(Chain).mineBlock(miner),
    },
  },
}

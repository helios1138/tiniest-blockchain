import { instance } from '../core/singleton/singleton'
import { Blocks } from '../blocks/blocks'

const map = ({ data, ...rest }) => ({ data: JSON.stringify(data), ...rest })

export const blocks = {
  // language=GraphQL Schema
  types: `
    type BlockData {
      transactions: [Transaction!]!
      proofOfWork: Int!
    }

    type Block {
      index: Int!
      timestamp: Date!
      data: BlockData!
      prevHash: String!
      hash: String!
    }

    extend type Query {
      chain: [Block!]!
    }

    extend type Mutation {
      mine (address: String!): Block!
    }
  `,
  resolvers: {
    Query: {
      chain: () => instance(Blocks).getChain(),
    },
    Mutation: {
      mine: (_, { address }, ctx) => instance(Blocks).mine(address, ctx),
    },
  },
}

import { instance } from '../core/singleton/singleton'
import { Blocks } from '../blocks/blocks'

const map = ({ data, ...rest }) => ({ data: JSON.stringify(data), ...rest })

export const blocks = {
  // language=GraphQL Schema
  types: `
    type Block {
      index: Int!
      timestamp: Date!
      data: String!
      prevHash: String!
      hash: String!
    }

    extend type Query {
      chain: [Block!]!
    }

    extend type Mutation {
      mine: Block!
    }
  `,
  resolvers: {
    Query: {
      chain: () => instance(Blocks).getChain().map(map),
    },
    Mutation: {
      mine: () => {
        const block = instance(Blocks).mine()
        return map(block)
      },
    },
  },
}

import { instance } from '../core/singleton/singleton'
import { Transactions } from '../transactions/transactions'

export const transactions = {
  // language=GraphQL Schema
  types: `
    type Transaction {
      from: String!
      to: String!
      amount: Float!
    }

    input TransactionInput {
      from: String!
      to: String!
      amount: Float!
    }

    extend type Query {
      transactions: [Transaction!]!
    }

    extend type Mutation {
      addTransaction (transaction: TransactionInput!): Transaction!
    }
  `,
  resolvers: {
    Query: {
      transactions: () => instance(Transactions).list(),
    },
    Mutation: {
      addTransaction: (_, { transaction }) => {
        instance(Transactions).add(transaction)
        return transaction
      },
    },
  },
}

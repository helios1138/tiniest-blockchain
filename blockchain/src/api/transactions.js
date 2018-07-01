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
      balance (address: String!): Float!
    }

    extend type Mutation {
      addTransaction (transaction: TransactionInput!): Transaction!
    }
  `,
  resolvers: {
    Query: {
      transactions: () => instance(Transactions).list(),
      balance: (_, { address }) => instance(Transactions).getBalance(address),
    },
    Mutation: {
      addTransaction: (_, { transaction }, ctx) => {
        instance(Transactions).add(transaction, ctx)
        return transaction
      },
    },
  },
}

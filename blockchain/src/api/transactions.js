import { instance } from '../core/singleton/singleton'
import { Transactions } from '../transactions/transactions'

export const transactions = {
  // language=GraphQL Schema
  types: `
    type Transaction {
      from: String!
      to: String!
      amount: Int!
    }

    input TransactionInput {
      from: String!
      to: String!
      amount: Int!
    }

    extend type Query {
      transactions (address: String): [Transaction!]!
      balance (address: String!): Int!
    }

    extend type Mutation {
      addTransaction (transaction: TransactionInput!): Transaction!
    }
  `,
  resolvers: {
    Query: {
      transactions: (_, { address }) => instance(Transactions).list(address),
      balance: (_, { address }) => instance(Transactions).getBalance(address),
    },
    Mutation: {
      addTransaction: (_, { transaction }) => instance(Transactions).add(transaction),
    },
  },
}

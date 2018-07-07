import { DateType } from './types/DateType'

export const root = {
  // language=GraphQL Schema
  types: `
    scalar Date

    type Query {
      _: Boolean
    }

    type Mutation {
      _: Boolean
    }
  `,
  resolvers: {
    Date: DateType,
  },
}

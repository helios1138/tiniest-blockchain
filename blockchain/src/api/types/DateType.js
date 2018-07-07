import { GraphQLScalarType, Kind } from 'graphql'

export const DateType = new GraphQLScalarType({
  name: 'Date',
  parseValue: value => new Date(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value)
    } else if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }

    return null
  },
  serialize: value =>
    (value instanceof Date)
      ? value.toISOString()
      : new Date(value).toISOString(),
})

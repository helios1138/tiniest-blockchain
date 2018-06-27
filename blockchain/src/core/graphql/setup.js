import R from 'ramda'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { createLogger } from '../logger/createLogger'

const logger = createLogger('graphql:setup')

const compileSchema = R.pipe(
  R.applySpec({
    typeDefs: R.pipe(
      R.values,
      R.map(R.prop('types')),
    ),
    resolvers: R.pipe(
      R.values,
      R.map(R.prop('resolvers')),
      R.call(R.mergeDeepRight),
    ),
  }),
  makeExecutableSchema,
)

export const setup = (app, schema) => {
  app.use('/graphql', graphqlExpress(req => ({ schema: compileSchema(schema), context: { req } })))
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  logger.info('success')
}

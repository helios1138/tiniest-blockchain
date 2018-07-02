import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const uri = 'http://localhost:3000/graphql'
const link = new BatchHttpLink({ uri, batchInterval: 50 })
const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({ link, cache })

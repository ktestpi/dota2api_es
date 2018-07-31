import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schemas.js'
import resolvers from './resolvers.js'

export default makeExecutableSchema({
  typeDefs,
  resolvers
})

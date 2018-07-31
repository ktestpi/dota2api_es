import express from 'express'
import { fs, rt } from './firebase.js'
import { graphqlExpress , graphiqlExpress }  from 'apollo-server-express'
import schema from './graphql'
const app = express()

app.set('PORT',process.env.PORT || 3000)

app.use('/api', express.json(), graphqlExpress({
  schema,
  context : { fs, rt }
}))

app.use('/apigql', graphiqlExpress({
  endpointURL : '/api'
}))

app.listen(app.get('PORT'), () => {
  console.log('Servidor conectado en puerto',app.get('PORT'));
})

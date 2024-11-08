import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
require('dotenv').config()

const uri = process.env.NEXT_PUBLIC_APOLLO_URI

const httpLink = new HttpLink({
    uri: uri || '/graphql',
    credentials: 'include',
})
const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:4001/subscriptions',
    })
)

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    uri: uri || '/graphql',
    link: splitLink,
    cache: new InMemoryCache(),
    credentials: 'include',
})
export default client

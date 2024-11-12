import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
require('dotenv').config()

const isDevelopment = process.env.NODE_ENV === 'development'

const httpUri = isDevelopment
    ? 'http://localhost:4001/graphql' // URL de dev
    : process.env.NEXT_PUBLIC_APOLLO_URI ||
      'https://easygift.mojocraft.fr/graphql' // URL de prod

const wsUri = isDevelopment
    ? 'ws://localhost:4001/subscriptions'
    : 'wss://easygift.mojocraft.fr/subscriptions'

const httpLink = new HttpLink({
    uri: httpUri,
    credentials: 'include',
    headers: {
        'Apollo-Require-Preflight': 'true',
    },
})

const wsLink = new GraphQLWsLink(
    createClient({
        url: wsUri,
        connectionParams: {
            credentials: 'include',
        },
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
    link: splitLink,
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
    },
})
export default client

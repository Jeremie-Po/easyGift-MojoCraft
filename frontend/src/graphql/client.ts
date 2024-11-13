import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
require('dotenv').config()

const isDevelopment = process.env.NODE_ENV === 'development'

const httpUri = isDevelopment
    ? 'http://localhost:4001/graphql' // URL de dev
    : 'https://easygift.mojocraft.fr/graphql' // URL de prod

const wsUri = isDevelopment
    ? 'ws://localhost:4001/graphql'
    : 'wss://https://easygift.mojocraft.fr/graphql'

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
        retryAttempts: 3,
        shouldRetry: error => {
            console.log('WS connection error:', error)
            return true
        },
        on: {
            connected: () => console.log('WS Connected'),
            error: error => console.log('WS Error:', error),
            closed: () => console.log('WS Closed'),
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

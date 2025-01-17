import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import schema from './schema'
import db from './db'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Cookies from 'cookies'
import { jwtVerify } from 'jose'
import { User } from './entities/user'
import { findUserByEmail } from './resolvers/usersResolver'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import http from 'http'

import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

dotenv.config()

export interface MyContext {
    req: express.Request
    res: express.Response
    user: User | null
}

export interface Payload {
    email: string
}

const port = 4001

const app = express()
const httpServer = createServer(app)

console.log('Initialisation du serveur WebSocket...')
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
    // path: '/subscriptions',
})
console.log('WebSocketServer initialisé avec succès.')

schema.then(async schema => {
    const serverCleanup = useServer(
        {
            schema,
            onConnect: ctx => {
                console.log(
                    `[${new Date().toISOString()}] WebSocket connection established`
                )
            },
            onSubscribe: (ctx, msg) => {
                console.log(
                    `[${new Date().toISOString()}] Subscription started: ${msg.payload.operationName}`
                )
            },
            onDisconnect: ctx => {
                console.log(
                    `[${new Date().toISOString()}] WebSocket connection closed`
                )
            },
        },
        wsServer
    )
    const server = new ApolloServer<MyContext>({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            // process.env.NODE_ENV === 'production'
            //     ? ApolloServerPluginLandingPageProductionDefault({
            //           graphRef: 'my-graph-id@current',
            //           embed: true,
            //           includeCookies: true,
            //       })
            //     : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ApolloServerPluginLandingPageLocalDefault({
                embed: true,
                includeCookies: true,
            }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    await db.initialize()
    await server.start()

    app.use(
        '/graphql',
        cors<cors.CorsRequest>({
            origin: [
                'http://localhost:3000',
                'http://localhost:4001',
                'https://studio.apollographql.com',
                'https://easygift.mojocraft.fr',
            ],
            credentials: true,
            methods: ['POST', 'GET', 'OPTIONS'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'apollo-require-preflight',
            ],
        }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }): Promise<MyContext> => {
                let user: User | null = null

                try {
                    const cookies = new Cookies(req, res)
                    const token = cookies.get('token')

                    if (token) {
                        const verify = await jwtVerify<Payload>(
                            token,
                            new TextEncoder().encode(process.env.SECRET_KEY)
                        )
                        user = await findUserByEmail(verify.payload.email)
                    }
                } catch (error) {
                    console.error('Error during authentication:', error)
                }

                return { req, res, user }
            },
        })
    )

    // const { url } = await startStandaloneServer(server, { listen: { port } })

    await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
    console.log(`graphql server listening on http://localhost:${port}/}`)
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('WSSSSS:', wsServer)
})

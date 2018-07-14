import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { merge } from 'lodash';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { baseType } from './api/resources/shared';
import { todoResolvers } from './api/resources/todo';
import { userResolvers } from './api/resources/user';
import appConfig from './config';
import { connect } from './db';

const server = express();

// database connection
connect()

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

const schema = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        baseType,
    ],
    resolvers: merge(
        {},
        userResolvers,
        todoResolvers,
    ),
});

server.use('*', cors({ origin: `http://localhost:${appConfig.port}` }));

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${appConfig.port}/subscriptions`,
}));

server.use('/graphql', bodyParser.json(), graphqlExpress((request) => ({
    schema,
    context: () => ({
        request,
        // connectors: {
        //     User,
        //     Todo,
        // },
    }),
})));

// Wrap the Express server
const ws = createServer(server);
ws.listen(appConfig.port, () => {
    console.log(`Apollo Server is now running on http://localhost:${appConfig.port}`);
});

// Set up the WebSocket for handling GraphQL subscriptions
const subscriptionServer = SubscriptionServer.create(
    {
        execute,
        subscribe,
        schema,
    }, {
        server: ws,
        path: '/subscriptions',
    },
);

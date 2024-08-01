const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');

const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');
const cors = require('cors');

const path = require('path');

import jwt from 'jsonwebtoken';
import cryptojs from "crypto-js";
import bodyParser from "body-parser";
import _ from "lodash";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import * as Utils from "./utils"

const logger = require("./utils/logger");
const { graphqlUploadExpress } = require('graphql-upload');

require('./cron-jobs.js');

const pubsub = new PubSub();
let subscriptionCount = [];

// Create an executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express application
const app = express();

// Create a logging plugin
const loggingPlugin = {
  async requestDidStart(requestContext) {
    // logger.info(`Request started: ${requestContext.request.operationName}`);
    // logger.info(`Query: ${requestContext.request.query}`);
    // logger.info(`Variables: ${JSON.stringify(requestContext.request.variables)}`);

    return {
      async didEncounterErrors(requestContext) {
        for (const err of requestContext.errors) {
          logger.error(`Error: ${err.message}`, { err });
        }
      },
      async willSendResponse(requestContext) {
        // console.log("Response: ", requestContext.response.data)
        // logger.info(`Response: ${JSON.stringify(requestContext.response.data)}`);
      },
    };
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ 
  schema, 
  plugins: [ApolloServerPluginLandingPageLocalDefault(), loggingPlugin],
  // introspection: true,
  introspection: process.env.NODE_ENV !== 'production',
  context: ({ req }) => {
    return { req: req.headers };
  },
  formatError: (error) => {
    // Log the error with Winston
    // const { message, locations, path, extensions } = error;
    // logger.error({
    //     message,
    //     locations,
    //     path,
    //     extensions,
    // });
    console.log("formatError :", error)

    return error; // Return the error as-is or modify as needed
  },
  // subscriptions: {
  //   path: '/graphql',
  //   onConnect: (connectionParams, webSocket) => {
  //     // Access headers from the connectionParams
  //     const { headers } = connectionParams;

  //     console.log('Connected with headers:', headers);

  //     // You can also implement authorization logic here if needed

  //     return {'Connected with headers:': headers}; // Return any context you want to pass to the resolvers
  //   },
  // },
});

// Start the server
server.start().then(() => {
  // server.applyMiddleware({ app });

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  // app.use(express.static("/app/uploads"));
  // /images       : path call from URL example localhost:4000/images/xxxx.jpg
  // /app/uploads  : path in container
  app.use('/images', express.static("/app/uploads"));

  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: "text/*" }));
  app.use(bodyParser.urlencoded({ extended: false }));

  // Configure CORS
  const corsOptions = {
    origin: 'http://localhost', // Replace with your frontend URL
    credentials: true,
  };

  app.use(cors(corsOptions));

  // Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  // Apply middleware to the Express app
  app.use('/graphql', expressMiddleware(
                    server , 
                    { context: async ({ req }) => ({ req: req.headers }),}));

  // app.use(express.json()); // This line adds JSON parsing middleware

  // Requests to `http://localhost:4000/health` now return "Okay!"
  app.get('/health', (req, res) => {
    res.status(200).send('Okay! >> ' + subscriptionCount.toString());
  });

  // Create an HTTP server
  const httpServer = app.listen(4000, () => {
    console.log('Server is now running on http://localhost:4000/graphql');

    // Emit data every minute
    setInterval(() => {
      pubsub.publish('USER_CONNECTED', { userConnected: 'A user connected : ' + Math.floor(Math.random() * 100) });
    }, 60000); // Every 60 seconds
  });

  // Create a WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Use the WebSocket server with graphql-ws
  useServer(
    {
      schema,
      onConnect: async(ctx) => {
        const { connectionParams, extra } = ctx;
        pubsub.publish('USER_CONNECTED', { userConnected: 'A user connected' });

        await Utils.logUserAccess(0, ctx);
        
        console.log('Client onConnect');

        return {xxxx : ctx}
      },
      onSubscribe: (ctx, msg) => {
        let {connectionParams, extra} = ctx
        console.log('Client onSubscribe');

        subscriptionCount = [...subscriptionCount, extra.request.headers['sec-websocket-key']]
      },
      onUnsubscribe: (ctx, msg) => {
        console.log('Client unsubscribed');
      },
      onDisconnect: async(ctx, code, reason) => {
        const { connectionParams, extra } = ctx;
        console.log('Client disconnected');

        subscriptionCount = _.filter(subscriptionCount, (el)=> el!==extra.request.headers['sec-websocket-key'])

        await Utils.logUserAccess(1, ctx);
      },
    },
    wsServer
  );
});

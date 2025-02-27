import { ApolloClient, ApolloLink, InMemoryCache, split, from } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from 'apollo-upload-client'; // v15.0.0
import { createClient } from 'graphql-ws';
import _ from "lodash"
import { setContext } from '@apollo/client/link/context';


import { onError } from '@apollo/client/link/error';

import { store } from "../redux/Redux";
import { ws_status } from "../redux/actions/ws";
import * as Constants from "../constants"
import { getCookie, fetchIpAddress } from "../util"

/////////////////////////

const connecting = (status) =>{
    let {ws} = store.getState()
    // if(ws){
    //   ws.is_connnecting === status ? "" : store.dispatch(ls_connecting(status));
    // }
}

let activeSocket, timedOut;

let restartRequestedBeforeConnected = false;
let gracefullyRestart = () => {
    restartRequestedBeforeConnected = true;
};

const wsLink = new GraphQLWsLink(createClient({
    url: (process.env.REACT_APP_NODE_ENV === "development" ? "ws://" + process.env.REACT_APP_HOST_GRAPHAL +"/graphql" :  "wss://" + process.env.REACT_APP_HOST_GRAPHAL +'/subscription' ) ,
    disablePong: false,
    connectionAckWaitTimeout: 0,
    retryAttempts: 50,
    keepAlive: 100_000,
    reconnect: true,
    retryWait: async function randomisedExponentialBackoff(retries) {
        console.log("wsLink retryWait")
        let retryDelay = 1000; // start with 1s delay
        for (let i = 0; i < retries; i++) {
            retryDelay *= 2;
        }
        await new Promise((resolve) =>
            setTimeout(
                resolve,
                retryDelay +
                // add random timeout from 300ms to 3s
                Math.floor(Math.random() * (3000 - 300) + 300),
            ),
        );
    },
    shouldRetry: (errOrCloseEvent) => {
        console.log("wsLink shouldRetry :")
        store.dispatch(ws_status(Constants.WS_SHOULD_RETRY));
        return true;
    },
    // connectionParams: {
    //   authToken: localStorage.getItem('usida'),
    //   textHeaders: "axxxx2",
    //   options:{ reconnect: true }
    // },
    // connectionParams: () => {
    //     // Note: getSession() is a placeholder function created by you
    //     const session = localStorage.getItem('usida');
    //     if (!session) {
    //         return {};
    //     }
    //     console.log("")
    //     return {
    //         // Authorization: `Bearer ${session.usida}`,
    //         authToken: localStorage.getItem('usida'),
    //         options:{ reconnect: true }
    //     };
    // },

    connectionParams: async() => ({
        authToken: getCookie('usida') /*localStorage.getItem('usida')*/ ,
        ip: await fetchIpAddress()
    }),
    on: {
        // 
        error: (err) => {
            console.log("Apollo :", err); // 👈 does this log?
        },
        // connected: () => console.log("connected client"),
        connecting: () => {
            // this.setState({ socketStatus: 'connecting' });
            console.log("wsLink connecting");

            connecting(true)

            store.dispatch(ws_status(Constants.WS_CONNECTION));
        },
        closed: () =>{
            console.log("wsLink closed");
            activeSocket =null
            connecting(false)

            store.dispatch(ws_status(Constants.WS_CLOSED));
        } ,
        connected: (socket) =>{
            activeSocket = socket

            console.log("wsLink connected");

            // gracefullyRestart = () => {
            //   if (socket.readyState === WebSocket.OPEN) {
            //     socket.close(4205, 'Client Restart');

            //     console.log("gracefullyRestart #1")
            //   }
            // };

            // // just in case you were eager to restart
            // if (restartRequestedBeforeConnected) {
            //   restartRequestedBeforeConnected = false;
            //   gracefullyRestart();

            //   console.log("gracefullyRestart #2")
            // }

            gracefullyRestart = () => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close(4205, 'Client Restart');
                }
            };

            // just in case you were eager to restart
            if (restartRequestedBeforeConnected) {
                restartRequestedBeforeConnected = false;
                gracefullyRestart();
            }

            store.dispatch(ws_status(Constants.WS_CONNECTED));
        },
        keepAlive: 50, // ping server every 10 seconds
        ping: (received) => {
            console.log("ping #0")

            if (!received){
                console.log("#1")
                timedOut = setTimeout(() => {
                console.log("timedOut")
                if (activeSocket.readyState === WebSocket.OPEN){
                    activeSocket.close(4408, 'Request Timeout');
                }
                    
                }, 5); // wait 5 seconds for the pong and then close the connection
            } // sent
        },
        pong: (received) => {
            console.log("pong #1")

            if (received){
                clearTimeout(timedOut); // pong is received, clear connection close timeout
            } 
        },
    },
}));
  
// 
const uploadLink =  createUploadLink({  
                                          uri: (process.env.REACT_APP_NODE_ENV === "development" ? "http://" : "https://") + process.env.REACT_APP_HOST_GRAPHAL +"/graphql", 
                                          headers:{ authorization: getCookie('usida') /*localStorage.getItem('usida')*/ ? `Bearer ${ getCookie('usida') /*localStorage.getItem('usida')*/ }` : "", } 
                                        })
  
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return ( definition.kind === 'OperationDefinition' && definition.operation === 'subscription' );
    },
    wsLink,
    // httpLink,
    // authLink.concat(httpLink),
    uploadLink,
);
  
// const authLink = new ApolloLink((operation, forward) => {
//     // Retrieve the authorization token from local storage.
//     const usida = getCookie('usida') //localStorage.getItem('usida');

//     // Use the setContext method to set the HTTP headers.
//     operation.setContext({
//         headers: {
//             authorization: usida ? `Bearer ${usida}` : ''
//         }
//     });

//     // Call the next link in the middleware chain.
//     return forward(operation);
// });

// Set up the context to include headers
const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage or another source
    // const token = localStorage.getItem('auth-token');
  
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorizationXXXXXX:  `Bearer xxxxBYY` ,
      },
    };
  });

// Define an error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
  
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
  

// const link = createUploadLink({ uri: "http://localhost:4000/graphql" });
export const client = new ApolloClient({
    // uri: 'http://localhost:4040/graphql',
    // link: splitLink,
    // link: ApolloLink.from([splitLink]),
    // link: authLink.concat(splitLink),

    link: from([errorLink, splitLink]),

    request: (operation) => {
      console.log("request >>>>>>>  ", operation)
    },
    // link: new WebSocketLink({
    //   uri: 'wss://localhost:4040/graphql',
    //   options: {
    //     reconnect: true,
    //     connectionParams: {
    //       headers: {
    //         Authorization: usida ? `Bearer ${usida}` : "",
    //       }
    //     }
    //   }
    // }),
    // cache: new InMemoryCache({
    //   typePolicies: {
    //     Query: {
    //       fields: {
    //         books: relayStylePagination(),
    //       },
    //     },
    //   },
    // }),
    cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
                suppliers: {
                    keyArgs: false,
                    merge(existing = {}, incoming) {
                        return !_.isEmpty(existing) ? {...existing, data: _.unionBy(incoming?.data, existing?.data, '_id') } : incoming
                    },
                    read(existing, { args: { input } }) {
                        return existing && existing
                    },
                }
            }
          }
        }
    }),
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors)
      console.log("networkError", networkError)
    },
    fetchOptions: {
        timeout: 10000, // Set the timeout value in milliseconds
    },
    credentials: 'include',
    debug: false
})
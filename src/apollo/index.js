import ApolloClient, { addTypename, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { AsyncStorage } from 'react-native';


const createApolloClient = (options) => new ApolloClient(Object.assign({}, {
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  // shouldBatch: true,
}, options));

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8888/graphql',
  opts: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
});

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options) {
      req.options = {};
      req.options.headers = {};
    }
    if (!req.options) {
      req.options = {};
    }
    req.options.headers = {};

    req.options.headers['chat-auth-token'] = await AsyncStorage.getItem('chat-auth-token');
    next();
  },
}]);



// Create WebSocket client
const wsClient = new SubscriptionClient(`ws://localhost:9000/`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  },
  subscribe: (request, handler) => wsClient.subscribe(request, handler),
  unsubscribe: (id) => wsClient.unsubscribe(id),
  onConnect: () => console.log('onConnect'),
  onReconnect: () => console.log('onReconnect'),
  onDisconnect: () => console.log('onDisconnect'),
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

const client = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: {},
});



export default client;

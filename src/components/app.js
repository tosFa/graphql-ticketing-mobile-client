import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Init from './screens/init';

import client from '../apollo';
import createStore from '../redux/store';

const store = createStore();

const theme = {
  backgroundColor: '#F5FCFF',
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
};



export default () => (
  <ApolloProvider client={client} store={store}>
    <ThemeProvider theme={theme} key="theme">
      <Init />
    </ThemeProvider>
  </ApolloProvider>
);
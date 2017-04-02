import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/components/app';

const renderApp = () => <App />;

AppRegistry.registerComponent('klara', () => renderApp);

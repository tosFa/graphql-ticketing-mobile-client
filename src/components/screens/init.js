import React from 'react';
import { StackNavigator } from 'react-navigation';
import Issue from './issue';
import Issues from './issues';
import Login from './login';


const BasicApp = StackNavigator({
  Home: {screen: Login},
  Issue: {screen: Issue},
  Issues: {screen: Issues},
});

export default BasicApp;
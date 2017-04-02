import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

export default ({ onPress, children }) =>
  <TouchableHighlight onPress={ onPress }>
    { children }
  </TouchableHighlight>
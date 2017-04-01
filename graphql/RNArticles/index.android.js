/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Dashboard from './src/dashboard';

const App = () =>
  <View style={{ flex: 1 }}>
    <Dashboard />
  </View>;

AppRegistry.registerComponent('RNArticles', () => App);

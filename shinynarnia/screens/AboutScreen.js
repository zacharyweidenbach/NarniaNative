import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import pak from '@exponent/ex-navigation/package.json';

export default class HomeScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'About',
      backgroundColor: '#ff9554',
      tintColor: '#ffffff'
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Narnia</Text>
        <Text style={styles.description}>Social Media for Fashion</Text>
        <Text style={styles.version}>Version: 0.0.1</Text>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8
  },
  version: {
    fontSize: 12,
    color: '#888888'
  },
  description: {
    fontSize: 12,
    color: '#888888'
  }
});

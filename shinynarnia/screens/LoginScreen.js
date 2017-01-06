import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import { Router } from '../main';

export default class LoginScreen extends Component {

  static route = {
    navigationBar: {
      title: 'Narnia',
      backgroundColor: '#ff9554',
    },
  }

  goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Splash Logo</Text>
        <Button title="Login via Facebook" onPress={this.goToScreen('SlidingTabScreen')}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  }
});

import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Main from '../index.ios.js';
import Signup from './signup.js';
import ip from '../network.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    elevation: 2,
    backgroundColor: '#fff'
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.isLoggedIn(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>NARNIA</Text>
        </View>
      </View>
    );
  }
}

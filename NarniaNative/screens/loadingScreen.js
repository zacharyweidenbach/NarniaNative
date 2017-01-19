import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

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
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
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
          <Text style={styles.text}>NARNIA</Text>
        </View>
      </View>
    );
  }
}
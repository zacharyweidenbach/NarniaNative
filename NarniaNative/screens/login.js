import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Text,
  View,
  Alert,
  TextInput,
  Button,
  Navigator,
  StyleSheet,
  Dimensions,
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
    flex: .4,
    justifyContent: 'flex-end',
    elevation: 2,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    width: 270,
    height: 40,
    marginTop: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#eee',
    width: 270,
    height: 40,
    marginTop: 10,
    borderRadius: 10
  },
  link: {
    paddingTop: 7
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitHandler() {
    fetch('http://' + ip.address + ':3000/api/users/mbLogin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then(function(response) {
      if (response._bodyText === 'Invalid username or password.') { // check if valid login
        Alert.alert(response._bodyText);
        this.setState({
          username: '',
          password: '',
          email: ''
        });
      } else { // let them login
        var userId = JSON.parse(response._bodyText).id;
        var token = JSON.parse(response._bodyText).token;
        this.props.setToken(token)
        .then(function() {
          this.props.setUserId({userId: userId});
          this.props.setId(userId)
          .then(function() {
            this.props.navigator.resetTo({
              id: 'SocialFeed'
            });
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }

  signupHandler() {
    this.props.navigator.push({
      id: 'Signup'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>NARNIA Login</Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({username: text})}
            placeholder="Username"
            placeholderTextColor="#eee"
            value={this.state.username}
          />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#eee"
            value={this.state.password}
          />
          <View style={styles.button}>
            <Button
              onPress={this.submitHandler.bind(this)}
              title="Submit"
              color="#000"
              accessibilityLabel="Submit to login"
            />
          </View>
          <View style ={styles.link}>
            <Button
              onPress={this.signupHandler.bind(this)}
              title="Signup"
              color="#ff9554"
              accessibilityLabel="Need an account? Go to signup."
            />
          </View>
        </View>
      </View>
    );
  }
}

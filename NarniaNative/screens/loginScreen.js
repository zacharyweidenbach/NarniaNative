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
  Image,
} from 'react-native';

import Signup from './signupScreen.js';
import ip from '../network.js';
import {loginScreenStyles as styles} from '../stylesheet.js';

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

  // facebookHandler() {
  //   this.props.navigator.push({
  //     id: 'Facebook'
  //   });
  // }

  render() {
    return (
      <Image style={styles.container} source = {require('../assets/images/bg3.jpg')}>
        <View style={styles.header}>
          <Text style={styles.narniaText}>NARNIA</Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({username: text})}
            maxLength={25}
            placeholder="Username"
            placeholderTextColor="#eee"
            color="#eee"
            selectionColor="#eee"
            value={this.state.username}
          />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            maxLength={25}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#eee"
            color="#eee"
            selectionColor="#eee"
            value={this.state.password}
          />
          <View style={styles.button}>
            <Button
              onPress={this.submitHandler.bind(this)}
              title="Log In"
              color="#eee"
              accessibilityLabel="Submit to create new account"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Need an account?</Text>
          <Button
            onPress={this.signupHandler.bind(this)}
            title="Sign Up"
            color="#ff9554"
            accessibilityLabel="Need an account? Go to signup."
          />
        </View>
      </Image>
    );
  }
}






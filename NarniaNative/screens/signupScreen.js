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
import Main from '../index.ios.js';
import Login from './login.js';
import ip from '../network.js';
import {loginScreenStyles as styles} from '../stylesheet.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      confirmEmail: '',
      pwDisplay: null,
      emailDisplay: null
    };
  }

  submitHandler() {
    var newUser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    if (this.state.password !== this.state.confirmPassword || this.state.email !== this.state.confirmEmail) {
      Alert.alert('Username and/or password do not match');
    } else {
      fetch('http://' + ip.address + ':3000/api/users/mbSignup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })
      .then(function(response) {
        if (response._bodyText === 'User already exists.') { // check if valid signup
          Alert.alert(response._bodyText);
          this.setState({
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            confirmEmail: ''
          });
        } else { // let them login
          var userId = JSON.parse(response._bodyText).id;
          var token = JSON.parse(response._bodyText).token;
          this.props.setToken(token)
          .then(function() {
            this.props.setUserId({userId: userId});
            this.props.setId(userId)
            .then(function() {
              this.props.navigator.resetTo({ //send to home page
                id: 'SocialFeed'
              });
            }.bind(this));
          }.bind(this));
        }
      }.bind(this));
    }
  }

  loginHandler() {
    this.props.navigator.push({id: 'Login'});
  }

  passwordHandler(text) {
    var that = this;
    if (text.length !== 0) {
      this.setState({
        password: text,
        pwDisplay: <TextInput style={styles.textInput}
                    onChangeText={(text) => that.setState({confirmPassword: text})}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor="#eee"
                    value={that.state.confirmPassword}
                  />
      });
    } else {
      this.setState({
        password: '',
        pwDisplay: null
      });
    }
  }

  emailHandler(text) {
    var that = this;
    if (text.length !== 0) {
      this.setState({
        email: text,
        emailDisplay: <TextInput style={styles.textInput}
                    onChangeText={(text) => that.setState({confirmEmail: text})}
                    placeholder="Confirm Email"
                    secureTextEntry={true}
                    placeholderTextColor="#eee"
                    value={that.state.confirmEmail}
                  />
      });
    } else {
      this.setState({
        email: '',
        emailDisplay: null
      });
    }
  }


  render() {
    return (
      <Image style={styles.container} source = {require('../assets/images/bg5.jpg')}>
        <View style={styles.header}>
          <Text style={styles.narniaText}>NARNIA</Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({username: text})}
            placeholder="Username"
            placeholderTextColor="#eee"
            value={this.state.username}
          />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.passwordHandler(text)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#eee"
            value={this.state.password}
          />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="#eee"
            value={this.state.confirmPassword}
          />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.emailHandler(text)}
            placeholder="Email"
            placeholderTextColor="#eee"
            value={this.state.email}
          />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({confirmEmail: text})}
            placeholder="Confirm Email"
            placeholderTextColor="#eee"
            value={this.state.confirmEmail}
          />
          <View style={styles.button}>
            <Button
              onPress={this.submitHandler.bind(this)}
              title="Submit"
              color="#eee"
              accessibilityLabel="Submit to create new account"
            />
          </View>
        </View>
        <View style ={styles.footer}>
          <Text style={styles.text}>Have an account?</Text>
          <Button
            onPress={this.loginHandler.bind(this)}
            title="Login"
            color="#ff9554"
            accessibilityLabel="Already have an account? Go to login."
          />
        </View>
      </Image>
    );
  }
}
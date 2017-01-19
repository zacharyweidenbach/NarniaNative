import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  Button
} from 'react-native';
import { POSTfetch } from '../utils.js';
import { loginSignup as styles} from '../stylesheet.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      confirmEmail: ''
    };
  }

  submitHandler() {
    var that = this;
    var newUser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    if (this.state.password !== this.state.confirmPassword || this.state.email !== this.state.confirmEmail) {
      Alert.alert('Username and/or password do not match');
    } else {
      return POSTfetch('users/mbSignup', newUser)
      .then((resJSON) => {
        if (resJSON === 'User already exists.') {
          Alert.alert(resJSON);
          that.setState({
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            confirmEmail: ''
          });
        } else {
          that.props.setToken(resJSON.token)
          .then(() => {
            that.props.setUserId({userId: resJSON.id});
            that.props.setId(resJSON.id)
            .then(() => {
              that.props.navigator.resetTo({ //send to home page
                id: 'SocialFeed'
              });
            });
          });
        }
      })
      .catch((err) => console.log('error: ' + err));
    }
  }

  loginHandler() {
    this.props.navigator.push({id: 'Login'});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>NARNIA Signup</Text>
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
          {this.state.password.length > 0
          ? <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({confirmPassword: text})}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#eee"
              value={this.state.confirmPassword}
            />
          : null}
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            placeholder="Email"
            placeholderTextColor="#eee"
            value={this.state.email}
          />
          {this.state.email.length > 0
          ? <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({confirmEmail: text})}
              placeholder="Confirm Email"
              placeholderTextColor="#eee"
              value={this.state.confirmEmail}
            />
          : null}
          <View style={styles.button}>
            <Button
              onPress={this.submitHandler.bind(this)}
              title="Submit"
              color="#000"
              accessibilityLabel="Submit to create new account"
            />
          </View>
          <View style ={styles.link}>
            <Button
              onPress={this.loginHandler.bind(this)}
              title="Login"
              color="#ff9554"
              accessibilityLabel="Already have an account? Go to login."
            />
          </View>
        </View>
      </View>
    );
  }
}
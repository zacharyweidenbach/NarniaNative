import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  TextInput,
  Button
} from 'react-native';
import { POSTfetch } from '../utils.js';
import { loginScreenStyles as styles} from '../stylesheet.js';

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
      .catch((err) => console.log('error: ', err));
    }
  }

  loginHandler() {
    this.props.navigator.push({id: 'Login'});
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
          {this.state.password.length > 0
          ? <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({confirmPassword: text})}
              maxLength={25}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#eee"
              color="#eee"
              selectionColor="#eee"
              value={this.state.confirmPassword}
            />
          : null}
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            maxLength={25}
            placeholder="Email"
            placeholderTextColor="#eee"
            color="#eee"
            selectionColor="#eee"
            value={this.state.email}
          />
          {this.state.email.length > 0
          ? <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({confirmEmail: text})}
              placeholder="Confirm Email"
              placeholderTextColor="#eee"
              color="#eee"
              selectionColor="#eee"
              value={this.state.confirmEmail}
            />
          : null}
          <View style={styles.button}>
            <Button
              onPress={this.submitHandler.bind(this)}
              title="Submit"
              color="#eee"
              accessibilityLabel="Submit to create new account"
            />
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
        </View>
      </Image>
    );
  }
}
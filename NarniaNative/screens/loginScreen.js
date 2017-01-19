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


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitHandler() {
    var that = this;
    return POSTfetch('users/mblogin', that.state)
    .then((resJSON) => {
      if (resJSON === 'Invalid username or password.') {
        Alert.alert(resJSON);
        that.setState({
          username: '',
          password: '',
          email: ''
        });
      } else { // login
        that.props.setToken(resJSON.token)
        .then(() => {
          that.props.setUserId({userId: resJSON.id});
          that.props.setId(resJSON.id)
          .then(() => {
            that.props.navigator.resetTo({
              id: 'SocialFeed'
            });
          });
        });
      }
    });
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
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
              title="Submit"
              color="#eee"
              accessibilityLabel="Submit to login"
            />
          </View>
          <View style ={styles.footer}>
            <Text style={styles.text}>Need an account?</Text>
            <Button
              onPress={this.signupHandler.bind(this)}
              title="Signup"
              color="#ff9554"
              accessibilityLabel="Need an account? Go to signup."
            />
          </View>
        </View>
      </Image>
    );
  }
}
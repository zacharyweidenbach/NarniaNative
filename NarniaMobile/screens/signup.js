import Exponent from 'exponent';
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
import Auth from '../auth.js';
import Main from '../main.js';
import Login from './login.js';
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
    textAlign: 'center',
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

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      screen: ''
    };
  }

  buttonHandler() {
    var newUser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };

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
          email: ''
        });
      } else { // let them login
        console.log('you can login!');
        Auth.setToken(JSON.parse(response._bodyText).token)
        .then(function() {
          Auth.setId(JSON.parse(response._bodyText).id)
          .then(function() {
            this.setState({ //send to home page
              screen: 'Main'
            });
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }

  loginHandler() {
    this.setState({screen: 'Login'});
  }

  render() {
    if (this.state.screen === '') {
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
               secureTextEntry="true"
              placeholderTextColor="#eee"
              value={this.state.password}
            />
            <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({email: text})}
              placeholder="Email"
              placeholderTextColor="#eee"
              value={this.state.email}
            />
            <View style={styles.button}>
              <Button
                onPress={this.buttonHandler.bind(this)}
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
    } else {
      return (
        <Navigator
          initialRoute = {{
            id: this.state.screen
          }}
          renderScene={
            this.navigatorRenderScene
          }
        />
      );
    }
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
    case 'Main':
      return (<Main navigator={navigator} title='Main'/>);
    case 'Login':
      return (<Login navigator={navigator} title='Login'/>);
    }
  }
}
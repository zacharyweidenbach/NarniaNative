import Exponent from 'exponent';
import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Text,
  View,
  TextInput,
  Button,
  Navigator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Auth from '../auth.js';
import Main from '../main.js';

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
  }
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: 'Username',
        password: 'Password',
        email: 'Email'
      },
      screen: ''
    };
  }

  buttonHandler() {
    var newUser = this.state.user;
    fetch('http://10.6.19.8:3000/api/users/mbSignup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    })
    .then(function(response) {
      Auth.setToken(JSON.parse(response._bodyText).token)
      .then(function() {
        Auth.setId(JSON.parse(response._bodyText).id)
        .then(function() {
          this.setState({ //send to home page
            screen: 'Main'
          });
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  render() {
    if (this.state.screen === '') {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>NARNIA</Text>
          </View>
          <View style={styles.form}>
            <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.user.username}
            />
            <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.user.password}
            />
            <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.user.email}
            />
            <View style={styles.button}>
              <Button
                onPress={this.buttonHandler.bind(this)}
                title="Submit"
                color="#000"
                accessibilityLabel="Learn more about this purple button"
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
    return (<Main navigator={navigator} title='Main'/>);
  }
}
import Exponent from 'exponent';
import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Navigator, Alert, AsyncStorage,
} from 'react-native';
import SocialFeed from './screens/socialFeed';
import LikesScreen from './screens/likesScreen';
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';

async function storeToken(token) {
  if (token) {
    try {
      await AsyncStorage.setItem('@Sessiontoken:token', token);
    } catch (error) {
      console.log(error, 'SET ERROR');
    }
  } else {
    try { // returns boolean for whether or not they are logged in;
      const value = await AsyncStorage.getItem('@Sessiontoken:token');
      if (value !== null){
        // We have data!!
        console.log(value, 'TOKEN VALUE');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Error retrieving data
      console.log(error, 'GET ERROR');
      return false;
    }
  }
}

async function logIn() {
  const { type, token, expires } = await Exponent.Facebook.logInWithReadPermissionsAsync(
    '365948040432096', {
      permissions: ['public_profile', 'email', 'user_friends'],
    });
  if (type === 'success') {
    storeToken(token);
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
    .then(function(resp) {
      fetch('http://10.6.19.8:3000/api/users/mobileFbLogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resp)
      })
    })

    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  } else if (type === 'cancel') {
    // send user to public view
  }
}

export default class App extends Component {
  componentDidMount() {
    if (!storeToken()) { // checks if they have a token, if not, show facebook login
      logIn();
    }
  }

  render() {
    storeToken(); // Testing whether or not key has stored
    return (
      <Navigator
        initialRoute = {{
          id: 'SearchScreen'
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    );
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed'/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen'/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen'/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen'/>);
    case 'CommentScreen':
      return (<SearchScreen navigator={navigator} title='CommentScreen'/>);
    }
  }
}

Exponent.registerRootComponent(App);
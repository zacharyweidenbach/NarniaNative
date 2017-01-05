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
import auth from './auth.js';
import Mixer from './screens/mixer.js'


export default class App extends Component {
  componentDidMount() {

    auth.getToken()
    .then(function(resp) {
      if (!resp) { // checks if they have a token, if not, show facebook login
        auth.logIn();
      }
    });

  }

  render() {
    return (
      <Navigator
        initialRoute = {{
          id: 'SocialFeed'
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
    case 'Mixer':
      return (<Mixer navigator={navigator} title='CommentScreen'/>);
    }
  }
}

Exponent.registerRootComponent(App);
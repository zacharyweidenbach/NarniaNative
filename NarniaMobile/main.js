import Exponent from 'exponent';
import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Navigator,
} from 'react-native';
import SocialFeed from './screens/socialFeed';
import LikesScreen from './screens/likesScreen';
import ProfileScreen from './screens/profileScreen';

export default class App extends Component {
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
    }
  }
}

Exponent.registerRootComponent(App);
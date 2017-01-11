import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  AppRegistry,
  Navigator,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Auth from './auth.js';

import Signup from './screens/signup';
import Login from './screens/login';
import SocialFeed from './screens/socialFeed';
import LikesScreen from './screens/likesScreen';
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';
import Mixer from './screens/mixer.js';
import ProfileMenu from './screens/profileMenu.js';

export default class NarniaNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'Loading',
      userId: '',
      selectedId: ''
    };
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
    this.viewedUser = this.viewedUser.bind(this);
  }

  componentWillMount() {
    Auth.getToken()
    .then(function(resp) {
      if (!resp) {
        this.setState({
          screen: 'Login'
        });
      } else {
        Auth.getId()
        .then(function(id) {
          this.setState({
            screen: 'SocialFeed',
            userId: id
          });
        }.bind(this));
      }
    }.bind(this));
  }

  viewedUser(id) { //for looking at user profiles
    this.setState({
      selectedId: id
    });
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
    case 'Login':
      return (<Login navigator={navigator} title='Login' setId={Auth.setId} setToken={Auth.setToken}/>);
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed' viewedUser={this.viewedUser} userId={this.state.userId} selectedId={this.state.selectedId}/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen' userId={this.state.userId}/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen' userId={this.state.userId} selectedId={this.state.selectedId}/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen' userId={this.state.userId}/>);
    case 'Mixer':
      return (<Mixer navigator={navigator} title='CommentScreen' userId={this.state.userId}/>);
    case 'ProfileMenu':
      return (<ProfileMenu navigator={navigator} title='ProfileMenu' destroySession={Auth.destroySession}/>);
    }
  }

  render() {
    if (this.state.screen === 'Loading') {
      return <View><Text>Loading...</Text></View>;
    }
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

AppRegistry.registerComponent('NarniaNative', () => NarniaNative);

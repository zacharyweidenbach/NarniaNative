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
import Signup from './screens/signup';
import Login from './screens/login';
import SocialFeed from './screens/socialFeed';
import LikesScreen from './screens/likesScreen';
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';
import Auth from './auth.js';
import Mixer from './screens/mixer.js';
import ProfileMenu from './screens/profileMenu.js';

export default class NarniaNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'Loading',
      id: '',
    };
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
    this.viewedUser = this.viewedUser.bind(this);
  }

  componentWillMount() {
    var that = this;
    Auth.getToken() // checks if they have a token, if not, show facebook login
    .then(function(resp) {
      if (!resp) {
        that.setState({
          screen: 'Login'
        });
      } else {
        // Auth.getId()
        // .then(function(id) {
        //   this.setState({
        //     screen: 'SocialFeed',
        //     id: id
        //   });
        // }.bind(this));
        Auth.getId()
        .then(function(id) {
          that.setState({
            screen: 'SocialFeed',
            id: id
          });
        });
      }
    });
  }
  viewedUser(id) { //for looking at user profiles, including your own
    this.setState({
      id: id
    });
    console.log('triggered viewedUser');
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
    case 'Login':
      return (<Login navigator={navigator} title='Login'/>);
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed' viewedUser={this.viewedUser} id={this.state.id}/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen'/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen' id={this.state.id}/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen'/>);
    case 'Mixer':
      return (<Mixer navigator={navigator} title='CommentScreen'/>);
    case 'ProfileMenu':
      return (<ProfileMenu navigator={navigator} title='ProfileMenu'/>);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NarniaNative', () => NarniaNative);

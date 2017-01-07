import Exponent from 'exponent';
import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Navigator,
  Alert,
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import Signup from './screens/signup';
import SocialFeed from './screens/socialFeed';
import LikesScreen from './screens/likesScreen';
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';
import Auth from './auth.js';
import Mixer from './screens/mixer.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'Loading'
    };
  }

  componentWillMount() {
    // Auth.destroySession();

    Auth.getToken() // checks if they have a token, if not, show facebook login
    .then(function(resp) {
      if (!resp) {
        this.setState({
          screen: 'SocialFeed'
        });
      } else {
        this.setState({
          screen: 'SocialFeed'
        });
      }
    }.bind(this));

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

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
    case 'Signup':
      return (<Signup navigator={navigator} title='Signup'/>);
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed'/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen'/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen'/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen'/>);
    case 'Mixer':
      return (<Mixer navigator={navigator} title='CommentScreen'/>);
    }
  }
}

Exponent.registerRootComponent(App);
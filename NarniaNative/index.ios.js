import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';
import Auth from './auth';
import Signup from './screens/signupScreen';
import Login from './screens/loginScreen';
import SocialFeed from './screens/socialFeedScreen';
import LikesScreen from './screens/likesScreen';
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';
import MenuScreen from './screens/menuScreen';
import MixerScreen from './screens/mixerScreen';
import Loading from './screens/loadingScreen';
import Wardrobe from './screens/wardrobeScreen.js';
import Camera from './screens/cameraScreen.js';

export default class NarniaNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ''
    };
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn(that) {
    Auth.getToken()
    .then(function(resp) {
      if (!resp) {
        that.props.navigator.resetTo({
          id: 'Login'
        });
      } else {
        that.props.navigator.resetTo({
          id: 'SocialFeed'
        });
      }
    });
  }

  //for looking at user profiles
  selectUser(id) {
    this.setState({userId: id});
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
    case 'Login':
      return (<Login navigator={navigator} title='Login' setToken={Auth.setToken}/>);
    case 'Signup':
      return (<Signup navigator={navigator} title='Signup' setToken={Auth.setToken}/>);
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed' selectUser={this.selectUser}/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen' selectUser={this.selectUser}/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen' userId={this.state.userId} selectUser={this.selectUser}/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen' selectUser={this.selectUser} userId={this.state.userId}/>);
    case 'MenuScreen':
      return (<MenuScreen navigator={navigator} title='MenuScreen' selectUser={this.selectUser} userId={this.state.userId} destroySession={Auth.destroySession}/>);
    case 'MixerScreen':
      return (<MixerScreen navigator={navigator} title='CommentScreen'/>);
    case 'Loading':
      return (<Loading navigator={navigator} title='Loading' isLoggedIn={this.isLoggedIn} />);
    case 'WardrobeScreen':
      return (<Wardrobe navigator={navigator} title='Wardrobe'/>);
    case 'cameraScreen':
      return (<Camera navigator={navigator} title='Camera'/>);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {{
          id: 'Loading'
        }}
        renderScene={
          this.navigatorRenderScene
        }
        configureScene={(route) => {
          if (route.id === 'MenuScreen') {
            return Navigator.SceneConfigs.FloatFromLeft;
          } else if (route.id === 'SearchScreen') {
            return Navigator.SceneConfigs.FloatFromRight;
          } else {
            return Navigator.SceneConfigs.FloatFromBottom;
          }
        }
        }
      />
    );
  }
}

AppRegistry.registerComponent('NarniaNative', () => NarniaNative);
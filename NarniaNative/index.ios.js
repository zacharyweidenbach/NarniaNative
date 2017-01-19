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
      userId: '',
      selectedId: ''
    };
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.viewedUser = this.viewedUser.bind(this);
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
        Auth.getId()
        .then(function(id) {
          this.setState({
            userId: id
          });
          that.props.navigator.resetTo({
            id: 'SocialFeed'
          });
        }.bind(this));
      }
    }.bind(this));
  }

  //generic function for changing keys in state
  setUserId(obj) {
    this.setState(obj);
  }

  //for looking at user profiles
  viewedUser(id) {
    this.setState({
      selectedId: id
    });
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
    case 'Login':
      return (<Login navigator={navigator} title='Login' setId={Auth.setId} setToken={Auth.setToken} setUserId={this.setUserId}/>);
    case 'Signup':
      return (<Signup navigator={navigator} title='Signup' setId={Auth.setId} setToken={Auth.setToken} setUserId={this.setUserId}/>);
    case 'Facebook':
      return (<Facebook navigator={navigator} title='Facebook' setId={Auth.setId} setToken={Auth.setToken} setUserId={this.setUserId}/>);
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed' viewedUser={this.viewedUser} userId={this.state.userId} selectedId={this.state.selectedId}/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen' userId={this.state.userId} viewedUser={this.viewedUser}/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen' userId={this.state.userId} selectedId={this.state.selectedId} viewedUser={this.viewedUser}/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen' viewedUser={this.viewedUser} userId={this.state.userId}/>);
    case 'MenuScreen':
      return (<MenuScreen navigator={navigator} title='MenuScreen' viewedUser={this.viewedUser.bind(this)} userId={this.state.userId} destroySession={Auth.destroySession}/>);
    case 'MixerScreen':
      return (<MixerScreen navigator={navigator} title='CommentScreen' userId={this.state.userId}/>);
    case 'Loading':
      return (<Loading navigator={navigator} title='Loading' isLoggedIn={this.isLoggedIn} />);
    case 'WardrobeScreen':
      return (<Wardrobe navigator={navigator} title='Wardrobe' userId={this.state.userId} />);
    case 'cameraScreen':
      return (<Camera navigator={navigator} title='Camera' userId={this.state.userId} />);
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
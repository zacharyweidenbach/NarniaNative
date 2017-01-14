import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
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
import Loading from './screens/loading.js';
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
  }

  // componentWillMount() {
  //   Auth.destroySession();
  // }

  isLoggedIn(that) {
    Auth.getToken()
    .then(function(resp) {
      if (!resp) {
        // that.props.navigator.push({
        //   id: 'Login'
        // });
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
          console.log(this.state);
        }.bind(this));
      }
    }.bind(this));
  }

  setUserId(obj) {
    this.setState(obj);
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
      return (<Login navigator={navigator} title='Login' setId={Auth.setId} setToken={Auth.setToken} setUserId={this.setUserId.bind(this)}/>);
    case 'Signup':
      return (<Signup navigator={navigator} title='Signup' setId={Auth.setId} setToken={Auth.setToken} setUserId={this.setUserId.bind(this)}/>);
    case 'SocialFeed':
      return (<SocialFeed navigator={navigator} title='SocialFeed' viewedUser={this.viewedUser.bind(this)} userId={this.state.userId} selectedId={this.state.selectedId}/>);
    case 'LikesScreen':
      return (<LikesScreen navigator={navigator} title='LikesScreen' userId={this.state.userId}/>);
    case 'ProfileScreen':
      return (<ProfileScreen navigator={navigator} title='ProfileScreen' userId={this.state.userId} selectedId={this.state.selectedId}/>);
    case 'SearchScreen':
      return (<SearchScreen navigator={navigator} title='SearchScreen' viewedUser={this.viewedUser.bind(this)} userId={this.state.userId}/>);
    case 'Mixer':
      return (<Mixer navigator={navigator} title='CommentScreen' userId={this.state.userId}/>);
    case 'ProfileMenu':
      return (<ProfileMenu navigator={navigator} title='ProfileMenu' viewedUser={this.viewedUser.bind(this)} userId={this.state.userId} destroySession={Auth.destroySession}/>);
    case 'Loading':
      return (<Loading navigator={navigator} title='Loading' isLoggedIn={this.isLoggedIn.bind(this)} />);
    case 'WardrobeScreen':
      return (<Wardrobe navigator={navigator} title='Wardrobe' userId={this.state.userId} />);
    case 'cameraScreen':
      console.log('ring of fire')
      return (<Camera navigator={navigator} title='Camera' userId={this.state.userId} />)
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
      />
    );
  }
}

AppRegistry.registerComponent('NarniaNative', () => NarniaNative);
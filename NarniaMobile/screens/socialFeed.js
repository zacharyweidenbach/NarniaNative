import Exponent from 'exponent';
import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
} from 'react-native';

import FeedPost from './feedPost.js';
import Mixer from './mixer.js';
import LikesScreen from './likesScreen';
import Auth from '../auth.js';
import ip from '../network.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tabViewContainer: {
    flex: 12,
  },
  header: {
    flex: 1,
    // elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#ff9554',
  },
  label: {
    color: 'black',
    fontWeight: '400',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};


export default class socialFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Feed' },
        { key: '2', title: 'Trending' },
      ],
      feedPosts: [],
      trendingPosts: [],
      // likesFeed: [],
    }
  };

  componentDidMount() {
    console.log(this.props.id, 'SELECTED ID');
    this.getTrendingPosts();
    this.getFollowingPosts();
  }

  // componentWillReceiveProps() {
  //   this.getTrendingPosts();
  //   this.getFollowingPosts();
  // }

  getTrendingPosts() {
    console.log('getting trending posts...');
    return fetch('http://' + ip.address + ':3000/api/getPostsFromDb', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((resJSON) => this.setState({trendingPosts: resJSON}))
      .catch((err) => console.log(err))
  }

  getFollowingPosts() {
    console.log('getting following posts...');
    return fetch('http://' + ip.address + ':3000/api/getAllFollowersPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.id,
      })
    })
      .then((res) => res.json())
      .then((resJSON) => this.setState({feedPosts: resJSON}))
      .catch((err) => console.log(err))
  }

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderHeader = (props) => {
    return (
      <TabBarTop
        {...props}
        // scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <ScrollView>
          {this.state.feedPosts.map((post, key) => {
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key} viewedUser={this.props.viewedUser} currentUser={this.props.id}/>
          })}
        </ScrollView>
      );
    case '2':
      return (
        <ScrollView>
          {this.state.trendingPosts.map((post, key) => {
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key} viewedUser={this.props.viewedUser} currentUser={this.props.id}/>
          })}
        </ScrollView>
      );
    case '3':
      return (
        <ScrollView>
          <LikesScreen />
        </ScrollView>
      );
    default:
      return null;
    }
  };

  onButtonPress(button) {
    switch (button) {
    case 'likes':
      this.props.navigator.push({
        id: 'LikesScreen'
      });
      break;
    case 'post':
      this.props.navigator.push({
        id: 'Mixer'
      });
      break;
    case 'search':
      this.props.navigator.push({
        id: 'SearchScreen'
      });
      break;
    case 'profile':
      Auth.getId()
      .then(function(id) {
        this.props.viewedUser(id);
        this.props.navigator.push({
          id: 'ProfileScreen'
        });
      }.bind(this))
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>NARNIA</Text>
        </View>
        <TabViewAnimated
          style={[ styles.tabViewContainer, this.props.style ]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
          initialLayout={initialLayout}
        />
        <View class="footer" style={styles.footer}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'likes')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/likes.png')} resizeMode={Image.resizeMode.contain} style={{ width: 32, height:32}}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'post')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/post.png')} resizeMode={Image.resizeMode.contain} style={{ width: 32, height: 32}}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/search.png')} resizeMode={Image.resizeMode.contain} style={{ width: 32, height: 32}}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'profile')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/avatar.png')} resizeMode={Image.resizeMode.contain} style={{ width: 32, height: 32}}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
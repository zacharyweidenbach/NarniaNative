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
import Icon from 'react-native-vector-icons/Ionicons';
import FeedPost from './feedPost.js';
import Mixer from './mixer.js';
import LikesScreen from './likesScreen';
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
    flexDirection: 'row',
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
      color: '#ff9554'
      // likesFeed: [],
    }
  };

  componentDidMount() {
    this.getFollowingPosts();
    this.getTrendingPosts();
  }

  componentWillReceiveProps() {
    this.getTrendingPosts();
    this.getFollowingPosts();
  }

  getTrendingPosts() {
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
    return fetch('http://' + ip.address + ':3000/api/getAllFollowersPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.userId,
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
          {this.state.feedPosts.length > 0 ? this.state.feedPosts.map((post, key) => {
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key} viewedUser={this.props.viewedUser} userId={this.props.userId} selectedId={this.props.selectedId}/>
          }) : <View style={{alignItems:'center', marginTop: 5}}><Text style={{color:'#888', fontSize:16}}>No posts available!</Text></View> }
        </ScrollView>
      );
    case '2':
      return (
        <ScrollView>
          { this.state.trendingPosts.length > 0 ? this.state.trendingPosts.map((post, key) => {
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key} viewedUser={this.props.viewedUser} userId={this.props.userId} selectedId={this.props.selectedId}/>
          }) : <View style={{alignItems:'center', marginTop: 5}}><Text style={{color:'#888', fontSize:16}}>No posts available!</Text></View> }
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
    case 'menu':
      this.props.navigator.push({
        id: 'ProfileMenu'
      });
      break;
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
      this.props.viewedUser(this.props.userId);
      this.props.navigator.push({
        id: 'ProfileScreen'
      });
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'menu')} underlayColor='transparent'>
              <Icon name="ios-menu" size={38} color={this.state.color} />
            </TouchableHighlight>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 26, color: this.state.color}}>NARNIA</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
              <Icon name="ios-search" size={38} color={this.state.color} />
            </TouchableHighlight>
          </View>
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
            <Icon name="ios-heart" size={38} color={this.state.color} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'post')} underlayColor='transparent'>
            <Icon name="ios-add-circle-outline" size={38} color={this.state.color} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'profile')} underlayColor='transparent'>
            <Icon name="ios-contact" size={38} color={this.state.color} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
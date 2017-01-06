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
} from 'react-native';

import FeedPost from './feedPost.js';
import Mixer from './mixer.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tabViewContainer: {
    flex: 11,
  },
  header: {
    flex: 1,
    elevation: 2,
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
        { key: '3', title: 'Likes' },
      ],
      feedPosts: [
        {
          "username": "mah Feed",
          "thumbnail": "https://avatars0.githubusercontent.com/u/20013587?v=3&s=460",
          "id": 1,
          "body": "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg",
          "description": "this is mah feed mah feed maaaaaah feed",
          "likesCount": 348934,
          "type": "image",
          "createdAt": "3456871348"
        }
      ],
      trendingPosts: [
        {
          "username": "Rick",
          "thumbnail": "https://avatars0.githubusercontent.com/u/20013587?v=3&s=460",
          "id": 1,
          "body": "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg",
          "description": "this should be a new post from Rick.",
          "likesCount": 10,
          "type": "image",
          "createdAt": "3456871348"
        },
        {
          "username": "MrJonWu",
          "thumbnail": "https://avatars1.githubusercontent.com/u/21250622?v=3&s=460",
          "id": 2,
          "body": "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-pictures-kitties.jpg",
          "description": "this should be a new post from MrJonWu.",
          "likesCount": 7,
          "type": "image",
          "createdAt": "3456871349"
        },
        {
          "username": "Haris",
          "thumbnail": "https://avatars2.githubusercontent.com/u/19330576?v=3&s=460",
          "id": 3,
          "body": "http://www.londoubros.com/assets/mainmenu/1142/editor/cat-fashion-septem_1773575i.jpg?0.24798612928882752",
          "description": "this should be a new post from Haris.",
          "likesCount": 3,
          "type": "image",
          "createdAt": "3456871350"
        },
        {
          "username": "Zach",
          "thumbnail": "https://avatars3.githubusercontent.com/u/14946412?v=3&s=460",
          "id": 4,
          "body": "http://i.telegraph.co.uk/multimedia/archive/01773/cat-fashion-may_1773579i.jpg",
          "description": "this should be a new post from Zach.",
          "likesCount": 9,
          "type": "image",
          "createdAt": "3456871351"
        }
      ],
      likesFeed: [
        {
          "username": "mah Likes",
          "thumbnail": "https://avatars0.githubusercontent.com/u/20013587?v=3&s=460",
          "id": 1,
          "body": "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg",
          "description": "this is mah likes mah likes maaaaaah likes",
          "likesCount": 434,
          "type": "image",
          "createdAt": "3456871348"
        }
      ],
    }
  };

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
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key}/>
          })}
        </ScrollView>
      );
    case '2':
      return (
        <ScrollView>
          {this.state.trendingPosts.map((post, key) => {
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key}/>
          })}
        </ScrollView>
      );
    case '3':
      return (
        <ScrollView>
          {this.state.likesFeed.map((post, key) => {
            return <FeedPost navigator={this.props.navigator} style={styles.page} post={post} key={key}/>
          })}
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
      // this.props.navigator.push({
      //   id: ''
      // });
      this.props.navigator.push({
        id: 'Mixer'
      });
      break;
    case 'search':
      this.props.navigator.push({
        id: 'SearchScreen'
      });
      console.log('Search Button');
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
              <Image source={require('../assets/buttons/likes.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height:35}}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'post')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/post.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35}}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/search.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35}}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
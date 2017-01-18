import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  Alert,
  StyleSheet,
  ScrollView,
  ListView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    LazyloadScrollView,
    LazyloadListView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
import FeedPost from './feedPost.js';
import Mixer from './mixer.js';
import LikesScreen from './likesScreen';
// import ip from '../network.js';
import {
  getFollowingPosts,
  getTrendingPosts,
  getOlderFollowingPosts,
  getOlderTrendingPosts
} from '../utils.js';

import {socialFeedStyles as styles} from '../stylesheet.js';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   tabViewContainer: {
//     flex: 12,
//   },
//   header: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 20,
//   },
//   tabbar: {
//     backgroundColor: '#fff',
//   },
//   page: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   indicator: {
//     backgroundColor: '#ff9554',
//   },
//   label: {
//     color: 'black',
//     fontWeight: '400',
//   },
//   footer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
// });

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

// var dataSourceFollowers = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// var dataSoureTrending = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class socialFeed extends Component {
  constructor(props) {
    super(props);

    this.dataSourceFollowers = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSoureTrending = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Feed' },
        { key: '2', title: 'Trending' },
      ],
      feedPosts: [],
      lastFeedId: 0,
      dataSourceFollowers: this.dataSourceFollowers.cloneWithRows([]),
      trendingPosts: [],
      dataSoureTrending: this.dataSoureTrending.cloneWithRows([]),
      trendingRow: 0,
      color: '#ff9554',
      isRefreshing: false,
    }
  };

  componentDidMount() {
    getFollowingPosts.call(this);
    getTrendingPosts.call(this);
  }

  // componentWillReceiveProps() {
  //   getTrendingPosts(this);
  //   // getFollowingPosts().bind(this);
  // }

  // getTrendingPosts() {
  //   return fetch('http://' + ip.address + ':3000/api/getPostsFromDb', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((resJSON) => {
  //       this.setState({trendingPosts: resJSON}, function() {
  //         this.setState({trendingRow: this.state.trendingRow + resJSON.length})
  //         this.setState({dataSoureTrending: dataSoureTrending.cloneWithRows(this.state.trendingPosts)})
  //       })
  //     })
  //     .catch((err) => console.log(err))
  // }

  // getOlderTrendingPosts() {
  //   // console.warn(this.state.trendingRow);
  //   return fetch('http://' + ip.address + ':3000/api/getPostsFromDb', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       row: this.state.trendingRow,
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((resJSON) => {
  //       if (resJSON.length > 0) {
  //         this.setState({trendingPosts: this.state.trendingPosts.concat(resJSON)}, function() {
  //           this.setState({dataSoureTrending: dataSoureTrending.cloneWithRows(this.state.trendingPosts)})
  //           this.setState({trendingRow: this.state.trendingRow + resJSON.length})
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }

  // getFollowingPosts() {
  //   return fetch('http://' + ip.address + ':3000/api/getAllFollowersPosts', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       userId: this.props.userId,
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((resJSON) => {
  //       this.setState({feedPosts: resJSON}, function() {
  //         this.setState({lastFeedId: resJSON[resJSON.length - 1].id})
  //         this.setState({dataSourceFollowers: dataSourceFollowers.cloneWithRows(this.state.feedPosts)})
  //       });
  //     })
  //     .catch((err) => console.log(err))
  // }

  // getOlderFollowingPosts() {
  //   return fetch('http://' + ip.address + ':3000/api/getAllFollowersPosts', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       userId: this.props.userId,
  //       postId: this.state.lastFeedId,
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((resJSON) => {
  //       if (resJSON.length > 0) {
  //         this.setState({feedPosts: this.state.feedPosts.concat(resJSON)}, function() {
  //           this.setState({dataSourceFollowers: dataSourceFollowers.cloneWithRows(this.state.feedPosts)})
  //           this.setState({lastFeedId: resJSON[resJSON.length - 1].id})
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }

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
  _onRefresh = () => {
    this.setState({isRefreshing: true});
    if (this.state.index === 0) {
      // this.setState({feedPosts: []});
      // this.setState({dataSourceFollowers: dataSourceFollowers.cloneWithRows([])})
      getFollowingPosts.call(this).then(() => {this.setState({isRefreshing: false})});
    } else if(this.state.index === 1) {
      this.setState({trendingRow: 0});
      getTrendingPosts.call(this).then(() => {this.setState({isRefreshing: false})});
    }
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      var followerslist = (this.state.feedPosts.length > 0) ? <ListView
            refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e" /> }
            enableEmptySections={true}
            onEndReached={() => getOlderFollowingPosts.call(this)}
            dataSource={this.state.dataSourceFollowers}
            renderRow={(rowData) => <FeedPost navigator={this.props.navigator} style={styles.page} post={rowData} viewedUser={this.props.viewedUser} userId={this.props.userId} selectedId={this.props.selectedId}/>} /> : <ScrollView  name="trending-feed" refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e"/> }><View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, alignItems:'center', marginTop: 5}}><Text style={{color:'#888', fontSize:16}}>No posts available!</Text></View></ScrollView>

      return (
        <View>
          {followerslist}
        </View>
        );
    case '2':
      var trendingList = (this.state.trendingPosts.length > 0) ? <ListView
              refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e" /> }
              enableEmptySections={true}
              onEndReached={() => getOlderTrendingPosts.call(this)}
              dataSource={this.state.dataSoureTrending}
              renderRow={(rowData) => <FeedPost navigator={this.props.navigator} style={styles.page} post={rowData} viewedUser={this.props.viewedUser} userId={this.props.userId} selectedId={this.props.selectedId}/>} /> : <ScrollView  name="trending-feed" refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e"/> }><View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, alignItems:'center', marginTop: 5}}><Text style={{color:'#888', fontSize:16}}>No posts available!</Text></View></ScrollView>
      return (
        <View>
          {trendingList}
        </View>
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
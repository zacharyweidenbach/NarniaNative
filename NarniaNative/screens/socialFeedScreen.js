import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  ScrollView,
  ListView,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedPost from '../components/feedPost';
import LikesScreen from './likesScreen';
import { POSTfetch } from '../utils';
import { socialFeedStyles as styles } from '../stylesheet';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

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
      isRefreshing: false,
    }
  };

  componentDidMount() {
    this.getFollowingPosts();
    this.getTrendingPosts();
  }

  getFollowingPosts() {
    return POSTfetch('getAllFollowersPosts', {userId: this.props.userId})
    .then((resJSON) => {
      this.setState({feedPosts: resJSON}, function() {
        this.setState({
          lastFeedId: resJSON[resJSON.length - 1].id,
          dataSourceFollowers: this.dataSourceFollowers.cloneWithRows(this.state.feedPosts)
        });
      });
    })
    .catch((err) => console.log('error: ' + err));
  };

  getTrendingPosts() {
    return POSTfetch('getPostsFromDb')
    .then((resJSON) => {
      this.setState({trendingPosts: resJSON}, function() {
        this.setState({
          trendingRow: this.state.trendingRow + resJSON.length,
          dataSoureTrending: this.dataSoureTrending.cloneWithRows(this.state.trendingPosts)
        });
      });
    })
    .catch((err) => console.log('error: ' + err));
  };

  getOlderFollowingPosts() {
    return POSTfetch('getAllFollowersPosts', {
      userId: this.props.userId,
      postId: this.state.lastFeedId,
    })
    .then((resJSON) => {
      if (resJSON.length > 0) {
        this.setState({feedPosts: this.state.feedPosts.concat(resJSON)}, function() {
          this.setState({
            dataSourceFollowers: this.dataSourceFollowers.cloneWithRows(this.state.feedPosts),
            lastFeedId: resJSON[resJSON.length - 1].id
          });
        });
      }
    })
    .catch((err) => console.log('error: ' + err));
  };

  getOlderTrendingPosts() {
    return POSTfetch('getPostsFromDb', {
      row: this.state.trendingRow,
    })
    .then((resJSON) => {
      if (resJSON.length > 0) {
        this.setState({
          trendingPosts: this.state.trendingPosts.concat(resJSON)
        }, function() {
          this.setState({
            dataSoureTrending: this.dataSoureTrending.cloneWithRows(this.state.trendingPosts),
            trendingRow: this.state.trendingRow + resJSON.length
          });
        });
      }
    })
    .catch((err) => console.log('error: ' + err));
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
  _onRefresh = () => {
    this.setState({isRefreshing: true});
    if (this.state.index === 0) {
      this.getFollowingPosts().then(() => {this.setState({isRefreshing: false})});
    } else if(this.state.index === 1) {
      this.setState({trendingRow: 0});
      this.getTrendingPosts().then(() => {this.setState({isRefreshing: false})});
    }
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      var followerslist = (this.state.feedPosts.length > 0) ? <ListView
            refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e" /> }
            enableEmptySections={true}
            onEndReached={() => this.getOlderFollowingPosts()}
            dataSource={this.state.dataSourceFollowers}
            renderRow={(rowData) => <FeedPost navigator={this.props.navigator} style={styles.page} post={rowData} viewedUser={this.props.viewedUser} userId={this.props.userId} selectedId={this.props.selectedId}/>} /> : <ScrollView  name="trending-feed" refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e"/> }><View style={styles.feedRender}><Text style={styles.feedText}>No posts available!</Text></View></ScrollView>

      return (
        <View>
          {followerslist}
        </View>
        );
    case '2':
      var trendingList = (this.state.trendingPosts.length > 0) ? <ListView
              refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e" /> }
              enableEmptySections={true}
              onEndReached={() => this.getOlderTrendingPosts()}
              dataSource={this.state.dataSoureTrending}
              renderRow={(rowData) => <FeedPost navigator={this.props.navigator} style={styles.page} post={rowData} viewedUser={this.props.viewedUser} userId={this.props.userId} selectedId={this.props.selectedId}/>} /> : <ScrollView  name="trending-feed" refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ffa56e"/> }><View style={styles.feedRender}><Text style={styles.feedText}>No posts available!</Text></View></ScrollView>
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
        id: 'MenuScreen'
      });
      break;
    case 'likes':
      this.props.navigator.push({
        id: 'LikesScreen'
      });
      break;
    case 'post':
      this.props.navigator.push({
        id: 'MixerScreen'
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
          <View style={styles.headerIcons}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'menu')} underlayColor='transparent'>
              <Icon name="ios-menu" size={38} color={'#ff9554'} />
            </TouchableHighlight>
          </View>
          <View style={styles.narniaContainer}>
            <Text style={styles.narniaText}>NARNIA</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
              <Icon name="ios-search" size={38} color={'#ff9554'} />
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
            <Icon name="ios-heart" size={38} color={'#ff9554'} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'post')} underlayColor='transparent'>
            <Icon name="ios-add-circle-outline" size={38} color={'#ff9554'} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'profile')} underlayColor='transparent'>
            <Icon name="ios-contact" size={38} color={'#ff9554'} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
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
import FriendsFeed from './friendsFeed.js';
import DesignerFeed from './designerFeed.js';
import TrendingFeed from './trendingFeed.js';

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
        { key: '1', title: 'Friends' },
        { key: '2', title: 'Designer' },
        { key: '3', title: 'Trending' },
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
          <FriendsFeed style={styles.page} />
        </ScrollView>
      );
    case '2':
      return (
        <ScrollView>
          <DesignerFeed style={styles.page} />
        </ScrollView>
      );
    case '3':
      return (
        <ScrollView>
          <TrendingFeed style={styles.page} />
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
      // Alert.alert(
      //   'Alert',
      //   'Route Length: ' + this.props.navigator.getCurrentRoutes.length.toString(),
      //   [
      //     // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ]
      // )
      break;
    case 'post':
      // this.props.navigator.push({
      //   id: ''
      // });
      console.log('Post Button');
      break;
    case 'search':
      // this.props.navigator.push({
      //   id: ''
      // });
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
import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchPeople from './searchPeople.js';
import SearchTags from './searchTags.js';
import SearchShop from './searchShop.js';

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
    flexDirection: 'row',
    // elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchBar: {
    flex: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBtn: {
    flex: 1
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
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  emptySpace: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  },
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class searchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'People' },
        { key: '2', title: 'Hashtags' },
        { key: '3', title: 'Shop' },
      ], 
      searchText: '',
      triggerSearch: '',
      color: '#ff9554',
    };
    this.resetSearchText = this.resetSearchText.bind(this);
  }
  _handleChangeTab = (index) => {
    this.setState({
      index, searchText:''
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
          <SearchPeople userId={this.props.userId} navigator={this.props.navigator} viewedUser={this.props.viewedUser} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    case '2':
      return (
        <ScrollView>
          <SearchTags userId={this.props.userId} navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    case '3':
      return (
          <SearchShop userId={this.props.userId} navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
      );
    default:
      return null;
    }
  };

  resetSearchText() {
    this.setState({ triggerSearch: ''});
    console.log('reset triggerSearch');
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'search':
      this.setState({triggerSearch: this.state.searchText});
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <Icon name="ios-arrow-back" size={38} color={this.state.color} />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>SEARCH</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput placeholder= 'Search' style={styles.searchBar} returnKeyType="search" onSubmitEditing={this.onButtonPress.bind(this, 'search')} onChangeText = {(searchText) => this.setState({searchText})} value={this.state.searchText} />
          <TouchableHighlight style={styles.searchBtn} onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
            <View style={{alignItems: 'center'}}>
              <Icon name="ios-search" size={38} color={this.state.color} />
            </View>
          </TouchableHighlight>
        </View>
        <TabViewAnimated
          style={[ styles.tabViewContainer, this.props.style ]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab} 
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}

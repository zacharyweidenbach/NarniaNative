import React, { Component } from 'react';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import {searchScreen as styles} from '../stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchPeople from '../components/searchPeople.js';
import SearchTags from '../components/searchTags.js';
import SearchShop from '../components/searchShop.js';

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
    };
  }

  handleChangeTab(index) {
    this.setState({index: index, searchText: ''});
  }

  renderHeader(props) {
    return (
      <TabBarTop
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
      />
    );
  }

  renderScene({ route }) {
    switch (route.title) {
    case 'People':
      return (
        <ScrollView>
          <SearchPeople userId={this.props.userId} navigator={this.props.navigator} viewedUser={this.props.viewedUser} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    case 'Hashtags':
      return (
        <ScrollView>
          <SearchTags userId={this.props.userId} navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    case 'Shop':
      return (
          <SearchShop userId={this.props.userId} navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
      );
    default:
      return null;
    }
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
          {/* Back Button */}
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
              <Icon name="ios-arrow-back" size={38} color='#ff9554' />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>SEARCH</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
        {/* Search Box */}
        <View style={styles.searchBarContainer}>
          <TextInput placeholder='Search' style={styles.searchBar} returnKeyType="search" onSubmitEditing={this.onButtonPress.bind(this, 'search')} onChangeText={(searchText) => this.setState({searchText})} value={this.state.searchText} />
          <TouchableHighlight style={styles.searchBtn} onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
            <View style={styles.searchBtnContainer}>
              <Icon name="ios-search" size={38} color='#ff9554' />
            </View>
          </TouchableHighlight>
        </View>
        {/* Tab View */}
        <TabViewAnimated
          style={styles.tabViewContainer}
          navigationState={this.state}
          renderScene={this.renderScene.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          onRequestChangeTab={this.handleChangeTab.bind(this)} 
        />
      </View>
    );
  }
}

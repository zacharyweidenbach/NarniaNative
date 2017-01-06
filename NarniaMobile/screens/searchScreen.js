import Exponent from 'exponent';
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
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  searchBar: {
    flex: 1,
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
    // position: 'absolute',
    left: -100, 
    // alignItems: 'center', 
    // paddingTop: 13,
  }
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
        { key: '2', title: 'Tags' },
        { key: '3', title: 'Shop' },
      ], 
      searchText: '',
      triggerSearch: ''
    };
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
          <SearchPeople navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    case '2':
      return (
        <ScrollView>
          <SearchTags navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    case '3':
      return (
        <ScrollView>
          <SearchShop navigator={this.props.navigator} style={styles.page} index={this.state.index} triggerSearch={this.state.triggerSearch} />
        </ScrollView>
      );
    default:
      return null;
    }
  };

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'search':
      console.log('search button click')
      this.setState({ triggerSearch: this.state.searchText})
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <View>
              <Image source={require('../assets/buttons/back.png')} resizeMode={Image.resizeMode.contain} style={{ width: 26, height: 26}}/>
            </View>
          </TouchableHighlight>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>Search</Text>
        </View>
        <TextInput placeholder= 'Search' style={styles.searchBar} onChangeText = {(searchText) => this.setState({searchText})} value={this.state.searchText} />
         <TouchableHighlight onPress={this.onButtonPress.bind(this, 'search')} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/search.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35}}/>
            </View>
          </TouchableHighlight>
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
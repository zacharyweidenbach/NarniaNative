import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import SearchShopGallery from './searchShopGallery';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default class SearchShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // onNamePress() {
  //   this.props.navigator.push({
  //     id: 'ProfileScreen'
  //   });
  // }
  render() {
    return (
      <View style={styles.container}>
        <SearchShopGallery />
      </View>
    ); 
  }
}

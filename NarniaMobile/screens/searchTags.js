import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import SearchTagsGallery from './searchTagsGallery';

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

export default class SearchTags extends Component {
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
        <SearchTagsGallery />
      </View>
    ); 
  }
}

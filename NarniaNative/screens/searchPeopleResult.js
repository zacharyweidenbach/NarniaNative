import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

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

export default class SearchPeopleResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: props.result.thumbnail,
      username: props.result.username,
      id: props.result.id,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: this.state.thumbnail}} />
          <Text style={styles.textStyle}>{this.state.username}</Text>   
        </View>
      </View>
    ); 
  }
}

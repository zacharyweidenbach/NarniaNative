import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: this.props.comment.thumbnail}} />
        <Text style={styles.username}>
          {this.props.comment.username}
        </Text>
        <Text style={styles.textStyle}>
          {this.props.comment.body}
        </Text>   
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    paddingLeft: 10,
  },
  thumbnail: {
    paddingLeft: 2,
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  username: {
    paddingLeft: 10,
    fontWeight: 'bold',
  }
});
import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import TimeAgo from 'react-native-timeago';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 8,
    paddingRight: 10,
  },
  textStyle: {
    flex: 1,
  },
  timeStamp: {
    flex: 1,
    paddingTop: 3,
    color: '#888'
  },
  thumbnail: {
    paddingLeft: 2,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  username: {
    fontWeight: 'bold',
  }
});

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: this.props.comment.thumbnail}} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.username}>
              {this.props.comment.username}
          </Text>
          <Text style={styles.textStyle}>
            {this.props.comment.body}
          </Text> 
          <TimeAgo style={styles.timeStamp} time={Number(this.props.comment.createdAt)}/>
        </View>
      </View>
    );
  }
}

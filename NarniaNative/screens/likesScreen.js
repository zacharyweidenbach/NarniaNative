import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LikesGallery from '../components/likesGallery';
import {POSTfetch} from '../utils.js';
import {likesScreenStyles as styles} from '../stylesheet.js';

export default class likesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      color: '#ff9554',
      currentPostId: null,
      postsVisible: false
    };
    this.getLikedPostId = this.getLikedPostId.bind(this);
  }

  componentDidMount() {
    this.getLikedPostId();
  }

  getLikedPostId() {
    var that = this;
    return POSTfetch('findLikedPostId', {
      userId: this.props.userId
    })
    .then((resJSON) => { that.setState({likes: resJSON}); });
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
              <Icon name="ios-arrow-back" size={38} color={this.state.color} />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>MY LIKES</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            {this.state.likes.length > 0 ? <LikesGallery userId={this.props.userId} likes={this.state.likes} viewedUser={this.props.viewedUser} navigator={this.props.navigator}/> : <View style={styles.noPostsContainer}><Text style={styles.noPostsText}>No posts liked!</Text></View>}
          </ScrollView>
        </View>
      </View>
    );
  }
}
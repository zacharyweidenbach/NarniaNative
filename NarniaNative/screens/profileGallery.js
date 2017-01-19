import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import PostModal from './postModal';
import {profileGalleryStyles as styles} from '../stylesheet.js';

export default class ProfileGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ff9554',
      currentPostId: null,
      postsVisible: false
    };
  }
  handleLikePostClick(postId) {
    this.setState({currentPostId: postId, postsVisible: true});
  }
  setPostsVisible(visible) {
    this.setState({postsVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.userPosts.map((post, key) => {
          if (key === 0) {
            return <TouchableHighlight key={key} onPress={() => this.handleLikePostClick(post.id)}><Image style={styles.imgLarge} source={{uri: post.body}} /></TouchableHighlight>;
          } else {
            return <TouchableHighlight key={key} onPress={() => this.handleLikePostClick(post.id)}><Image style={styles.imgSmall} source={{uri: post.body}} /></TouchableHighlight>;
          }
        })}
        {this.state.postsVisible ? <PostModal userId={this.props.userId} postId={this.state.currentPostId} modalVisible={this.state.postsVisible} setModalVisible={this.setPostsVisible.bind(this)} viewedUser={this.props.viewedUser} navigator={this.props.navigator} /> : null}
      </View>
    );
  }
}
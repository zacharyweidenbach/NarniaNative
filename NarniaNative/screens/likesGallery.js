import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import PostModal from './postModal';
import {likesGalleryStyles as styles} from '../stylesheet.js';

export default class LikesGallery extends Component {
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
        {this.props.likes.map((like, key) => {
          if (key === 0) {
            return <TouchableHighlight key={key} onPress={() => this.handleLikePostClick(like.id)}><Image style={styles.imgLarge} source={{uri: like.body}} /></TouchableHighlight>;
          } else {
            return <TouchableHighlight key={key} onPress={() => this.handleLikePostClick(like.id)}><Image style={styles.imgSmall} source={{uri: like.body}} /></TouchableHighlight>;
          }
        })}
        {this.state.postsVisible ? <PostModal userId={this.props.userId} postId={this.state.currentPostId} modalVisible={this.state.postsVisible} setModalVisible={this.setPostsVisible.bind(this)} viewedUser={this.props.viewedUser} navigator={this.props.navigator} /> : null}
      </View>
    );
  }
}
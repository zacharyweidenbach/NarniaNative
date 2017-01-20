import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeAgo from 'react-native-timeago';
import CommentsModal from '../components/commentsModal.js';
import TagsModal from './tagsModal.js';
import PostModal from './postModal.js';
import PostImage from '../components/postImage.js';
import { feedPost as styles } from '../stylesheet.js';
import { POSTfetch } from '../utils.js';

export default class FeedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      tagsModalVisible: false,
      commentsVisible: false,
      postsVisible: false,
      comments: [],
      tags: [],
      currentTag: null,
      likesCount: this.props.post.likesCount,
      postLiked: false,
      color: '#ff9554',
      createdAt: Number(this.props.post.createdAt),
    };
  }

  componentDidMount() {
    this.setState({likesCount: this.props.post.likesCount});
    this.checkInitialLike();
    this.getTags();
    //change ip address to either wifi address or deployed server
    return POSTfetch('getCommentsFromDb', {id: this.props.post.id})
    .then((resJSON) => this.setState({comments: resJSON}))
    .catch((err) => console.log(err));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.post !== this.props.post) {
      this.setState({likesCount: this.props.post.likesCount});
      this.checkInitialLike();
      this.getTags();
    }
  }

  getTags() {
    var that = this;
    return POSTfetch('getTagsFromDb', {postId: that.props.post.id})
    .then((resJSON) => that.setState({tags: resJSON}))
    .catch((err) => console.log(err));
  }

  handleTagClick(tag) {
    this.setState({currentTag: tag, tagsModalVisible: true});
  }

  checkLikeExists() {
    var that = this;
    return POSTfetch('checkLikeExists', {
      userId: this.props.userId,
      postId: this.props.post.id
    })
    .then((resJSON) => {
      if (resJSON.length > 0) {
        that.decreaseLikeCount();
      } else {
        that.increaseLikeCount();
      }
    })
    .catch((err) => console.log(err));
  }

  checkInitialLike() {
    var that = this;
    return POSTfetch('checkLikeExists', {
      userId: this.props.userId,
      postId: this.props.post.id,
    })
    .then((resJSON) => {
      if (resJSON.length > 0) {
        //set state of the button color to orange
        that.setState({postLiked: true});
      } else {
        that.setState({postLiked: false});
      }
    })
    .catch((err) => console.log(err));
  }

  increaseLikeCount() {
    var that = this;
    POSTfetch('increaseLikeCount', {id: that.props.post.id})
    .then((resJSON) => that.setState({
      likesCount: that.state.likesCount + 1,
      postLiked: true
    }))
    .catch((err) => console.log(err));

    return POSTfetch('insertLikesPosts', {
      userId: that.props.userId,
      postId: that.props.post.id
    })
    .then((resJSON) => console.log('successful insertLike'))
    .catch((err) => console.log(err));
  }

  decreaseLikeCount() {
    var that = this;
    POSTfetch('decreaseLikeCount', {id: this.props.post.id})
    .then((resJSON) => that.setState({
      likesCount: that.state.likesCount - 1, postLiked: false,
    }))
    .catch((err) => console.log(err));

    return POSTfetch('deleteLikesPosts', {
      userId: this.props.userId,
      postId: this.props.post.id,
    })
    .then((resJSON) => console.log('successful deleteLike'))
    .catch((err) => console.log(err));
  }

  onNamePress() {
    this.props.viewedUser(this.props.post.userId);
    this.props.navigator.push({
      id: 'ProfileScreen',
    });
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'like':
      this.checkLikeExists();
      break;
    case 'comment':
      this.setState({commentsVisible: true});
      break;
    case 'posts':
      this.setState({postsVisible: true});
    }
  }

  setModalVisible(visible, screen) {
    if (screen === 'tagsModal') {
      this.setState({tagsModalVisible: visible});
    } else {
      this.setState({commentsVisible: visible});
    }
  }

  setPostsVisible(visible) {
    this.setState({postsVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Username and Thumbnail */}
        <View style={styles.userContainer}>
          <TouchableHighlight onPress={this.onNamePress.bind(this)} underlayColor='transparent'>
            <Image style={styles.thumbnail} source={{uri: this.props.post.thumbnail}} />
          </TouchableHighlight>
          <Text style={styles.textStyle} onPress={this.onNamePress.bind(this)}>{this.props.post.username}</Text>
        </View>

        {/* Post Image*/}
        <TouchableHighlight underlayColor='transparent' onPress={this.onButtonPress.bind(this, 'posts')}>
          <View >
            <PostImage _style={styles} post={this.props.post}/>
          </View>
        </TouchableHighlight>

        {/* Likes and Comment Button */}
        <View style={styles.actionBar}>
          <View style={styles.likesContainer}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'like')} style={styles.likesBtn} underlayColor='transparent'>
              <View>
                {this.state.postLiked ? <Icon name="ios-heart" size={35} color={this.state.color} /> : <Icon name="ios-heart-outline" size={35} color={this.state.color} />}
              </View>
            </TouchableHighlight>
            <Text style={styles.textStyle}>{this.state.likesCount} Likes</Text>
          </View>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'comment')} style={styles.commentBtn} underlayColor='transparent'>
            <View>
              <Icon name="ios-chatbubbles" size={35} color={this.state.color} />
            </View>
          </TouchableHighlight>
        </View>

        {/* TimeAgo */}
        <View style={styles.timeContainer}>
          <TimeAgo style={styles.time} time={this.state.createdAt} />
        </View>

        {/* Description and Tags*/}
        {this.state.tags.length > 0 ?
          <View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{this.props.post.description}</Text>
            </View>
            <View style={styles.tagsContainer}>
              <Text style={styles.tagText}>Tags:</Text>
              {this.state.tags.map((tag, key) => {
                return <Text style={styles.tagText} key={key} onPress={() => this.handleTagClick(tag)}>#{tag.tag}</Text>;
              })}
            </View>
          </View> :
          <View style={styles.descriptionWithoutTagsContainer}>
            <Text style={styles.descriptionText}>{this.props.post.description}</Text>
          </View>}

        {this.state.commentsVisible ? <CommentsModal userId={this.props.userId} postId={this.props.post.id} modalVisible={this.state.commentsVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
        {this.state.tagsModalVisible ? <TagsModal viewedUser={this.props.viewedUser} navigator={this.props.navigator} userId={this.props.userId} tag={this.state.currentTag} modalVisible={this.state.tagsModalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}

        {this.state.postsVisible ? <PostModal viewedUser={this.props.viewedUser} navigator={this.props.navigator} userId={this.props.userId} postId={this.props.post.id} post={this.props.post} modalVisible={this.state.postsVisible} setModalVisible={this.setPostsVisible.bind(this)} onNamePress={this.onNamePress.bind(this)} onButtonPress={this.onButtonPress.bind(this)} color={this.state.color} postLiked={this.state.postLiked} likesCount={this.state.likesCount}/> : null}
      </View>
    );
  }
}

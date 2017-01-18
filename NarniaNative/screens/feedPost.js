import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight,
  TextArea
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeAgo from 'react-native-timeago';
import CommentsModal from './commentsModal.js';
import TagsModal from './tagsModal.js';
import ip from '../network';
import PostModal from './postModal.js';
import PostImage from '../components/postImage.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f5'
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  imgContainer: {
    flex: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: '#fff',
  },
  outfitContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgOutfitContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    backgroundColor: '#fff'
  },
  actionBar: {
    //contains likesContainer, likesBtn, and commentBtn
    flex: 1,
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesBtn: {
    paddingLeft: 15,
  },
  commentBtn: {
    paddingRight: 15,
    justifyContent: 'flex-end',
  },
  descriptionWithoutTagsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  descriptionText: {
    paddingLeft: 15, paddingRight: 10, color: '#4f4f4f',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbnail: {
    marginLeft: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0,
  },
  tagText: {
    paddingLeft: 15, paddingRight: 10, color: '#ff9554',
  },
  tagsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start' 
  },
  time: {
    backgroundColor: '#fff',
    color: '#4f4f4f',
    paddingLeft: 15,
    paddingBottom: 10,
  }
});

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
    return fetch('http://' + ip.address + ':3000/api/getCommentsFromDb', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.props.post.id})
    })
      .then((res) => res.json())
      .then((resJSON) => this.setState({comments: resJSON}))
      .catch((err) => console.log(err));
  }

  // componentWillReceiveProps() {
  //   this.setState({likesCount: this.props.post.likesCount});
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
    fetch('http://' + ip.address + ':3000/api/getTagsFromDb', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({postId: that.props.post.id})
    })
    .then((res) => res.json())
    .then((resJSON) => that.setState({tags: resJSON}))
    //.then(() => console.warn('tags', that.props.post.id, that.state.tags))
    .catch((err) => console.log(err));
  }

  handleTagClick(tag) {
    this.setState({currentTag: tag, tagsModalVisible: true});
  }

  checkLikeExists() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/checkLikeExists', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.userId,
        postId: this.props.post.id,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      // console.log('resJSON in checkLikeExists', resJSON);
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
    fetch('http://' + ip.address + ':3000/api/checkLikeExists', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.userId,
        postId: this.props.post.id,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      // console.log('resJSON in checkInitialLike', resJSON);
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
    fetch('http://' + ip.address + ':3000/api/increaseLikeCount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.post.id,
      })
    })
    .then((resJSON) => that.setState({
      likesCount: that.state.likesCount + 1,
      postLiked: true,
    }))
    .catch((err) => console.log(err));

    fetch('http://' + ip.address + ':3000/api/insertLikesPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.userId,
        postId: this.props.post.id,
      })
    })
    .then((resJSON) => console.log('successful insertLike'))
    .catch((err) => console.log(err));
  }

  decreaseLikeCount() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/decreaseLikeCount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.post.id,
      })
    })
    .then((resJSON) => that.setState({
      likesCount: that.state.likesCount - 1, postLiked: false,
    }))
    .catch((err) => console.log(err));

    fetch('http://' + ip.address + ':3000/api/deleteLikesPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.userId,
        postId: this.props.post.id,
      })
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
        <TouchableHighlight onPress={this.onButtonPress.bind(this, 'posts')}>
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

        {this.state.commentsVisible ? <CommentsModal userId={this.props.userId} postId={this.props.post.id} modalVisible={this.state.commentsVisible} setModalVisible={this.setCommentsVisible.bind(this)}/> : null}
        {this.state.tagsModalVisible ? <TagsModal viewedUser={this.props.viewedUser} navigator={this.props.navigator} userId={this.props.userId} tag={this.state.currentTag} modalVisible={this.state.tagsModalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
        {this.state.postsVisible ? <PostModal userId={this.props.userId} postId={this.props.post.id} post={this.props.post} modalVisible={this.state.postsVisible} setModalVisible={this.setPostsVisible.bind(this)} onNamePress={this.onNamePress.bind(this)} onButtonPress={this.onButtonPress.bind(this)} color={this.state.color} postLiked={this.state.postLiked} likesCount={this.state.likesCount}/> : null}

      </View>
    );
  }
}

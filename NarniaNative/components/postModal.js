import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Modal,
  TouchableHighlight,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  TextInput,
  Text,
  Image,
  AlertIOS
} from 'react-native';

import Comment from './comment.js';
import ip from '../network.js';
import PostImage from './postImage.js';
import TimeAgo from 'react-native-timeago';
import {postModalStyles as styles} from '../stylesheet'; 

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    if (props.post) {
      this.state = {
        comments: [],
        post: props.post,
        message: '',
        passedPostAsProp: true,
        color: '#ff9554',
        likesCount: props.post.likesCount,
        postLiked: false,
      };
    } else {
      this.state = {
        comments: [],
        post: '',
        message: '',
        passedPostAsProp: false,
        color: '#ff9554',
        likesCount: 0,
        postLiked: false,
      };
    }
  }

  componentDidMount() {
    if (!this.state.passedPostAsProp) {
      this.getPost();
    }
    this.getComments();
    this.checkInitialLike();
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
        postId: this.props.postId
      })
    })
    .then((res) => res.json())
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
    fetch('http://' + ip.address + ':3000/api/checkLikeExists', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.userId,
        postId: this.props.postId
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      console.log('resJSON in checkInitialLike', resJSON);
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
        id: this.props.postId,
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
        postId: this.props.postId,
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
        id: this.props.postId,
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
        postId: this.props.postId
      })
    })
    .then((resJSON) => console.log('successful deleteLike'))
    .catch((err) => console.log(err));
  }

  getPost() {
    var that = this;
    return fetch('http://' + ip.address + ':3000/api/getPostFromPostId', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({postId: this.props.postId})
    })
    .then((res) => res.json())
    .then((resJSON) => that.setState({post: resJSON[0], likesCount: resJSON[0].likesCount}))
    .then(() => console.log('getPost', this.state.post))
    .catch((err) => console.log(err));
  }

  getComments() {
    var that = this;
    return fetch('http://' + ip.address + ':3000/api/getCommentsFromDb', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.props.postId})
    })
    .then((res) => res.json())
    .then((resJSON) => that.setState({comments: resJSON}))
    .catch((err) => console.log(err));
  }

  sendPost() {
    var that = this;
    var today = new Date;

    if (this.state.post !== '') {
      return fetch('http://' + ip.address + ':3000/api/postToDb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postid: this.props.postId,
          userid: this.props.userId,
          body: this.state.message,
          type: 'comment',
          createdAt: today.getTime(),
        })
      })
      .then((res) => {
        that.setState({message: ''});
        that.getComments();
      })
      .catch((err) => console.warn(err));
    }
  }

  handlePostButton() {
    var that = this;
    AlertIOS.prompt('Enter a post message...', null, (msg) => {
      that.setState({message: msg}, () => that.sendPost());
    });
  }

  profileHandler() {
    this.onNamePress();
    this.props.setModalVisible(false);
  }

  onNamePress() {
    this.props.viewedUser(this.state.post.userId);
    this.props.navigator.push({
      id: 'ProfileScreen',
    });
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { alert('Modal has been closed.'); } }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            {/* Back Button */}
            <View style={styles.buttonContainer}>
              <TouchableHighlight underlayColor='transparent' onPress={() => {
                this.props.setModalVisible(false, 'postModal');
              }}>
                <Icon name="ios-arrow-back" size={38} color={this.state.color} />
              </TouchableHighlight>
            </View>
          </View>

          <ScrollView style={styles.scrollViewContainer}>
            {/* Thumbnail and Username */}
            <View style={styles.userContainer}>
              <TouchableHighlight onPress={this.profileHandler.bind(this)} underlayColor='transparent'>
                <Image style={styles.thumbnail} source={{uri: this.state.post.thumbnail}} />
              </TouchableHighlight>
              <Text style={styles.textStyle} onPress={this.profileHandler.bind(this)}>
                {this.state.post.username}
              </Text>
            </View>

            {/* Images */}
            <ScrollView horizontal={true} pagingEnabled={true}>
              <PostImage _style={styles} post={this.state.post}/>
            </ScrollView>
            
            {/* Likes Button */}
            <View style={styles.actionBar}>
              <View style={styles.likesContainer}>
                <TouchableHighlight onPress={() => this.checkLikeExists()} style={styles.likesBtn} underlayColor='transparent'>
                  <View>
                    {this.state.postLiked ? <Icon name="ios-heart" size={35} color={this.state.color} /> : <Icon name="ios-heart-outline" size={35} color={this.state.color} />}
                  </View>
                </TouchableHighlight>
                <Text style={styles.textStyle}>{this.state.likesCount} Likes</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{this.state.post.description}</Text>
            </View>

            {/*TimeAgo*/}
            <View style={styles.timeContainer}>
              <TimeAgo style={styles.time} time={Number(this.state.post.createdAt)} />
            </View>

            {/* Comments Input*/}
            <Button title="Post a Comment" color="#ff9554" onPress={this.handlePostButton.bind(this)}/>

            {/* Comments List*/}
            <View style={styles.comments}>
              <ScrollView>
                {this.state.comments.length > 0 ? this.state.comments.map((comment, key) => {
                  return <Comment comment={comment} key={key} />;
                }) : <View style={styles.centerView}><Text style={styles.text}>No comments available</Text></View>}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

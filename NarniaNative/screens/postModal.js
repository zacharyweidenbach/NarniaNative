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
  Image
} from 'react-native';
import Comment from './comment.js';
import ip from '../network.js';
import PostImage from '../components/postImage.js';
import TimeAgo from 'react-native-timeago';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postcomment: {
    flex: 1,
  },
  comments: {
    flex: 8,
  },
  imgContainer: {
    flex: 1,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10,
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
    paddingRight: 15
  },
  likesBtn: {
    paddingLeft: 15,
  },
  thumbnail: {
    marginLeft: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingBottom: 10,
  },
  descriptionText: {
    paddingLeft: 15, paddingRight: 10, color: '#4f4f4f',
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

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    if (props.post) {
      this.state = {
        comments: [],
        post: props.post,
        passedPostAsProp: true,
        color: '#ff9554',
        likesCount: props.post.likesCount,
        postLiked: false,
      };
    } else {
      this.state = {
        comments: [],
        post: '',
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
      this.getComments();
      this.checkInitialLike();
    } else {
      this.getComments();
      this.checkInitialLike();
    }
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

  sendPost(post) {
    var that = this;
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
          body: this.state.post,
          type: 'comment',
          createdAt: new Date()
        })
      })
      .then((res) => {
        console.log('success posting');
        that.setState({post: ''});
        that.getComments();
      })
      .catch((err) => console.log(err));
    }
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
        {/* Exit Button */}
        <View style={{flex: .08, alignItems: 'flex-end', paddingTop: 10, paddingRight: 5}}>
          <TouchableHighlight underlayColor='transparent' onPress={() => {
            this.props.setModalVisible(false);
          }}>
            <Icon name="ios-close" size={38} color={this.state.color} />
          </TouchableHighlight>
        </View>

        <ScrollView style={styles.container}>
          {/* Thumbnail and Username */}
          <View style={styles.userContainer}>
            <TouchableHighlight onPress={this.profileHandler.bind(this)} underlayColor='transparent'>
              <Image style={styles.thumbnail} source={{uri: this.state.post.thumbnail}} />
            </TouchableHighlight>
            <Text style={styles.textStyle} onPress={this.profileHandler.bind(this)}>
              {this.state.post.username}
            </Text>
          </View>
          
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

          {/* Images */}
          <ScrollView horizontal={true} pagingEnabled={true}>
            <PostImage _style={styles} post={this.props.post}/>
          </ScrollView>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.state.post.description}</Text>
          </View>

          {/*TimeAgo*/}
          <View style={styles.timeContainer}>
            <TimeAgo style={styles.time} time={Number(this.props.post.createdAt)} />
          </View>

          {/* Comments Input*/}
          <TextInput multiline={true} maxLength={255} placeholder='Post a comment...' style={styles.postcomment} value={this.state.post} onChangeText={(text) => this.setState({post: text})}/>
          <Button title="Post" color="#ff9554" onPress={this.sendPost.bind(this)}/>

          {/* Comments List*/}
          <View style={styles.comments}>
            <ScrollView>
              {this.state.comments.length > 0 ? this.state.comments.map((comment, key) => {
                return <Comment comment={comment} key={key} />;
              }) : <View style={{alignItems: 'center'}}><Text style={{color: '#888'}}>No comments available</Text></View>}
            </ScrollView>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

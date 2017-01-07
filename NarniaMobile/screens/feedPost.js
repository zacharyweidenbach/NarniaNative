import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  TextArea
} from 'react-native';

import CommentsModal from './commentsModal.js';
// import Auth from '../auth.js';
//Auth.getId().then(function(resp) {
  // console.log(resp);
  // })
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
    paddingBottom: 10,
  },
  imgContainer: {
    flex: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  actionBar: {
    //contains likesContainer, likesBtn, and commentBtn
    flex: 1,
    justifyContent: 'space-between',  
    flexDirection: 'row',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesBtn: {
    paddingLeft: 10,
  },
  commentBtn: {
    paddingRight: 10,
    justifyContent: 'flex-end',
  },
  descriptionContainer: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbnail: {
    marginLeft: 10,
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
});

const currentUser = 1; //MrJonWu;

export default class FeedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      comments: [],
      likesCount: this.props.post.likesCount, 
    };
  }

  componentDidMount() {
    //change ip address to either wifi address or deployed server
    return fetch('http://10.6.19.12:3000/api/getCommentsFromDb', {
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
  checkLikeExists() {
    var that = this;
    fetch('http://10.6.19.12:3000/api/checkLikeExists', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUser,
        postId: this.props.post.id,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => { 
      console.log('postId', this.props.post.id);
      console.log('length', resJSON.length);
      if (resJSON.length > 0) {
        that.decreaseLikeCount();
      } else {
        that.increaseLikeCount();
      }
    })
    .catch((err) => console.log(err));
  }

  increaseLikeCount() {
    var that = this;
    fetch('http://10.6.19.12:3000/api/increaseLikeCount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.post.id,
      })
    })
    .then((resJSON) => that.setState({likesCount: that.state.likesCount + 1}))
    .catch((err) => console.log(err));

    fetch('http://10.6.19.12:3000/api/insertLikesPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUser,
        postId: that.props.post.id,
      })
    })
    .then((resJSON) => console.log('successful insertLike'))
    .catch((err) => console.log(err));
  }

  decreaseLikeCount() {
    var that = this;
    fetch('http://10.6.19.12:3000/api/decreaseLikeCount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: that.props.post.id,
      })
    })
    .then((resJSON) => that.setState({likesCount: that.state.likesCount - 1}))
    .catch((err) => console.log(err));

    fetch('http://10.6.19.12:3000/api/deleteLikesPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUser,
        postId: this.props.post.id,
      })
    })
    .then((resJSON) => cnosole.log('successful deleteLike'))
    .catch((err) => console.log(err));
  }

  onNamePress() {
    this.props.navigator.push({
      id: 'ProfileScreen'
    });
  }
  
  onButtonPress(button) {
    var that = this;
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'like':
      that.checkLikeExists();
      break;
    case 'comment':
      console.log('Comment Pressed');
      this.setState({modalVisible: true});
      break;
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: this.props.post.thumbnail}} />
          <Text style={styles.textStyle} onPress={this.onNamePress.bind(this)}>{this.props.post.username}</Text>   
        </View>
        <View>
          <Image style={styles.imgContainer} source={{uri: this.props.post.body}} />
        </View>
        <View style={styles.actionBar}>
          <View style={styles.likesContainer}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'like')} style={styles.likesBtn} underlayColor='transparent'>
              <View>
                <Image source={require('../assets/buttons/likes.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35 }}/>
              </View>
            </TouchableHighlight>
            <Text style={styles.textStyle}>{this.state.likesCount} Likes</Text>
          </View>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'comment')} style={styles.commentBtn} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/comment.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35 }}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{paddingLeft: 10, paddingRight: 10, color: '#4f4f4f'}}>{this.props.post.description}</Text>
        </View>

        {this.state.modalVisible ? <CommentsModal id={this.props.post.id} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}

      </View>
    )
  }
}

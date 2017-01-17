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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f5',
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
});

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      post: '',
      color: '#ff9554'
    };
  }

  componentDidMount() {
    this.getComments();
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
    this.props.onNamePress();
    this.props.setModalVisible(false);
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
          <View style={styles.actionBar}>

            {/* Thumbnail and Username */}
            <View style={styles.userContainer}>
              <TouchableHighlight onPress={this.profileHandler.bind(this)} underlayColor='transparent'>
                <Image style={styles.thumbnail} source={{uri: this.props.post.thumbnail}} />
              </TouchableHighlight>
              <Text style={styles.textStyle} onPress={this.profileHandler.bind(this)}>
                {this.props.post.username}
              </Text>
            </View>

            {/* Likes Button */}
            <View style={styles.likesContainer}>
              <TouchableHighlight onPress={() => { this.props.onButtonPress('like'); }} style={styles.likesBtn} underlayColor='transparent'>
                <View>
                  {this.props.postLiked ? <Icon name="ios-heart" size={35} color={this.props.color} /> : <Icon name="ios-heart-outline" size={35} color={this.props.color} />}
                </View>
              </TouchableHighlight>
              <Text style={styles.textStyle}>{this.props.likesCount} Likes</Text>
            </View>

          </View>

          {/* Images */}
          <ScrollView horizontal={true} pagingEnabled={true}>
            <PostImage _style={styles} post={this.props.post}/>
          </ScrollView>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.props.post.description}</Text>
          </View>

          {/* Comments */}
          <TextInput multiline={true} maxLength={255} placeholder='Post a comment...' style={styles.postcomment} value={this.state.post} onChangeText={(text) => this.setState({post: text})}/>
          <Button title="Post" color="#ff9554" onPress={this.sendPost.bind(this)}/>
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

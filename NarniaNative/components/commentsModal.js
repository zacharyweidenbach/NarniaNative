import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Modal,
  TouchableHighlight,
  View,
  ScrollView,
  Button,
  TextInput,
  Text,
} from 'react-native';

import Comment from './comment.js';
import {POSTfetch} from '../utils';
import {commentsModal as styles} from '../stylesheet';

export default class CommentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      message: '',
    };
  }

  componentDidMount() {
    this.getCommentsFromDb();
  }

  getCommentsFromDb() {
    POSTfetch('getCommentsFromDb', {id: this.props.postId})
    .then((res) => this.setState({comments: res}));
  }

  postMessage() {
    var today = new Date();
    if (this.state.message !== '') {
      POSTfetch('postToDb', {
        postid: this.props.postId,
        userid: this.props.userId,
        body: this.state.message,
        type: 'comment',
        createdAt: today.getTime()
      })
      .then((res) => {
        this.setState({message: ''});
        this.getCommentsFromDb();
      });
    }
  }

  render() {
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.props.modalVisible}>
        <View style={styles.container}>
          <View style={styles.header}> 
            {/* Close Button */}
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={styles.button} underlayColor='transparent' onPress={() => {
                this.props.setModalVisible(false, 'commentsModal');
              }}>
                <Icon name="ios-arrow-back" size={38} color='#ff9554'/>
              </TouchableHighlight>
            </View>
          </View>
          {/* Message Box */}
          <View style={styles.textInputContainer}>
            <TextInput multiline={true} maxLength={255} placeholder='Type a comment...' style={styles.textInput} value={this.state.message} onChangeText = {(text) => this.setState({message: text})}/>
          </View>
          <Button title="Post Comment" color="#ff9554" onPress={this.postMessage.bind(this)}/>
          {/* Comments Feed */}
          <View style={styles.commentsContainer}>
            <ScrollView>
              {this.state.comments.length > 0 ? this.state.comments.map((comment, key) => {
                return <Comment comment={comment} key={key} />;
              }) : 
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No comments so far!
                </Text>
              </View>}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Dimensions, ScrollView, Button, TextInput, Text } from 'react-native';

import { Ionicons } from '@exponent/vector-icons';
import Comment from './comment.js';
import ip from '../network.js';
import Auth from '../auth.js';

export default class CommentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      post: '',
      id: ''
    };
  }

  componentWillMount() {
    Auth.getId()
    .then(function(resp) {
      this.setState({
        id: resp
      });
    }.bind(this));
  }

  componentDidMount() {
    //change ip address to either wifi address or deployed server
    this.getComments();
  }

  getComments() {
    return fetch('http://' + ip.address + ':3000/api/getCommentsFromDb', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.props.id})
    })
      .then((res) => res.json())
      .then((resJSON) => this.setState({comments: resJSON}))
      .then(() => console.log(this.state.comments))
      .catch((err) => console.log(err));
  }

  sendPost(post) {
    var that = this;
    if (that.state.post !== '') {
      return fetch('http://' + ip.address + ':3000/api/postToDb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postid: that.props.id,
          userid: this.state.id,
          body: that.state.post,
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

  render() {
    return (
      <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
         <View style={styles.container}>
          <View>
            <TouchableWithoutFeedback onPress={() => {
              this.props.setModalVisible(false)
            }}>
              <Ionicons name="ios-close" size={36} color="#ff9554" />
            </TouchableWithoutFeedback>
          </View>
          <TextInput multiline={true} placeholder='Post a comment...' style={styles.postcomment} value={this.state.post} onChangeText = {(text) => this.setState({post: text})}/>
          <Button title="Post" color="#ff9554" onPress={this.sendPost.bind(this)}/>
          <View style={styles.comments}>
            <ScrollView>
              {this.state.comments.length > 0 ? this.state.comments.map((comment, key) => {
                return <Comment comment={comment} key={key} />
              }) : <Text style={{color: '#888'}}>No comments available</Text>}
            </ScrollView>
          </View>
         </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    // marginBottom: 0,
  },
  postcomment: {
    flex: 1,
  },
  comments: {
    flex: 8,
    // flexWrap: 'wrap'
  }
});
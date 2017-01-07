import React, { Component } from 'react';
import { Modal, Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import FeedPost from './feedPost.js';

export default class CommentsModal extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          >
         <View style={styles.container}>
          <View style={styles.actionBar}>
            
            <TouchableOpacity style={styles.btn} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
             <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <FeedPost post={{
              "username": "Rick",
              "thumbnail": "https://avatars0.githubusercontent.com/u/20013587?v=3&s=460",
              "id": 1,
              "body": "http://funnycatsgif.com/wp-content/uploads/2015/04/cat-images-funny-picture.jpg",
              "description": "this should be a new post from Rick.",
              "likesCount": 10,
              "type": "image",
              "createdAt": "3456871348"
            }}/>
          </ScrollView>
         </View>
        </Modal>

        <TouchableWithoutFeedback onPress={() => {
          this.setModalVisible(true)
        }}>
          <View>
            <Text>Show Modal</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 6,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  btn: {
    justifyContent: 'flex-end',
  },
});
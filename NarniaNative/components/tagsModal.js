import React, { Component } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableHighlight, 
  View, 
  ScrollView, 
  Text, 
  Image
} from 'react-native';

import {POSTfetch} from '../utils';
import {tagsModal as styles} from '../stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import PostModal from './postModal';

export default class TagsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPostId: null,
      postModalVisible: false
    };
  }

  componentWillMount() {
    this.getPostsFromTag();
  }

  getPostsFromTag() {
    POSTfetch('getPostsFromTag', {tagId: this.props.tag.id})
    .then((res) => this.setState({posts: res}));
  }

  handlePostClick(postId) {
    this.setState({currentPostId: postId, postModalVisible: true});
  }

  setModalVisible(visible, screen) {
    switch (screen) {
    case 'postModal':
      this.setState({postModalVisible: visible});
      break;
    }
  }

  render() {
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.props.tagsModalVisible}>
        {/*Tags Modal*/}
        <View style={styles.container}>
          <View style={styles.header}>
            {/* Back Button */}
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback onPress={() => { this.props.setModalVisible(false, 'tagsModal'); }}>
                 <Icon name="ios-arrow-back" size={38} color='#ff9554' style={styles.backBtn}/>
              </TouchableWithoutFeedback>
            </View>
            {/*Tag Header*/}   
            <View style={styles.textContainer}>
              <Text style={styles.tagHeader}> 
                #{this.props.tag.tag} 
              </Text>
            </View>
            <View style={styles.emptySpace}></View>
          </View>
        {/*Tag Gallery*/}
          <View style={styles.gallery}>
            <ScrollView>
              <View style={styles.scrollContainer}>
                {this.state.posts.length > 0 ? this.state.posts.map((post, key) => {
                  return <TouchableHighlight key={key} onPress={() => this.handlePostClick(post.id)}><Image style={styles.imgSmall} source={{uri: post.body}} /></TouchableHighlight>;
                }) : null}
              </View>
            </ScrollView>
          </View>
        </View>
        {/* Post Modal */}
        {this.state.postModalVisible ? <PostModal userId={this.props.userId} postId={this.state.currentPostId} modalVisible={this.state.postModalVisible} setModalVisible={this.setModalVisible.bind(this)} viewedUser={this.props.viewedUser} navigator={this.props.navigator} /> : null}
    </Modal>
    );
  }
}
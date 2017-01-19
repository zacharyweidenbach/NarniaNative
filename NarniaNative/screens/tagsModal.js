import React, { Component } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableHighlight, 
  View, 
  ScrollView, 
  TextInput, 
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

  setPostModalVisible(visible) {
    this.setState({postModalVisible: visible});
  }

  render() {
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.props.tagsModalVisible}>
        {/*Tags Modal*/}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.emptySpace}>
            </View>
            {/*Tag Header*/}   
            <View style={styles.textContainer}>
              <Text style={styles.tagHeader}> 
                #{this.props.tag.tag} 
              </Text>
            </View>
            {/* Close Button */}
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback onPress={() => { this.props.setModalVisible(false, 'tagsModal'); }}>
                 <Icon name="ios-close" size={42} color='orange' style={styles.closeBtn}/>
              </TouchableWithoutFeedback>
            </View>
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
        {this.state.postModalVisible ? <PostModal userId={this.props.userId} postId={this.state.currentPostId} modalVisible={this.state.postModalVisible} setModalVisible={this.setPostModalVisible.bind(this)} viewedUser={this.props.viewedUser} navigator={this.props.navigator} /> : null}
    </Modal>
    );
  }
}
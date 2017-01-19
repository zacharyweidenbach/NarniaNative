import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, TouchableHighlight, View, StyleSheet, Dimensions, ScrollView, Button, TextInput, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';
import PostModal from './postModal';

export default class tagsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPostId: null,
      postsVisible: false
    };
  }

  componentWillMount() {
    this.getPostsByTag();
  }

  getPostsByTag() {
    var that = this;
    return fetch('http://' + ip.address + ':3000/api/getPostsFromTag', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tagId: this.props.tag.id})
    })
    .then((res) => res.json())
    .then((resJSON) => that.setState({posts: resJSON}))
    .catch((err) => console.warn(err));
  }

  handleLikePostClick(postId) {
    this.setState({currentPostId: postId, postsVisible: true});
  }

  setPostsVisible(visible) {
    this.setState({postsVisible: visible});
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.tagsModalVisible}
        onRequestClose={() => { alert('Modal has been closed.'); }}
      >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.emptySpace}></View>
          <View style={styles.textContainer} >
            <Text style={styles.text}> #{this.props.tag.tag} </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableWithoutFeedback onPress={() => { this.props.setModalVisible(false, 'tagsModal'); }}>
               <Icon name="ios-close" size={42} color='orange' style={styles.closeBtn}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            <View style={styles.scrollContainer}>
              {this.state.posts.length > 0 ? this.state.posts.map((post, key) => {
                return <TouchableHighlight key={key} onPress={() => this.handleLikePostClick(post.id)}><Image style={styles.imgSmall} source={{uri: post.body}} /></TouchableHighlight>;
              }) : null}
            </View>
          </ScrollView>
        </View>
      </View>
      {this.state.postsVisible ? <PostModal userId={this.props.userId} postId={this.state.currentPostId} modalVisible={this.state.postsVisible} setModalVisible={this.setPostsVisible.bind(this)} viewedUser={this.props.viewedUser} navigator={this.props.navigator} /> : null}
    </Modal>
    );
  }
}

 // <View key={key}><Image style={styles.imgSmall} source={{uri: post.body}} /></View>;
 //              }) : null}

const styles = StyleSheet.create({
  emptySpace: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    flex: 1, 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
  },
  text: {
    color: '#ff9554',
    fontSize: 24,
    fontWeight: 'bold'
  },
  gallery: {
    flex: 12,
    backgroundColor: '#f9f7f5'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#f9f7f5',
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
  closeBtn: {
    paddingRight: 15
  }
});
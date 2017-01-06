import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';

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
});

export default class FeedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onNamePress() {
    this.props.navigator.push({
      id: 'ProfileScreen'
    });
  }
  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'like':
      console.log(this.props.post.id);
      break;
    case 'comment':
      console.log('Comment Pressed');
      break;
    }
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
            <Text style={styles.textStyle}>{this.props.post.likesCount} Likes</Text>
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
      </View>
    );
  }
}
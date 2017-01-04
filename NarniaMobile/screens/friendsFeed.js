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

export default class FriendsFeed extends Component {
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
      console.log('Like Pressed');
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
          <Image style={styles.thumbnail} source={require('../assets/images/thumbnail.jpg')} />
          <Text style={styles.textStyle} onPress={this.onNamePress.bind(this)}>Outrageous Ocelot</Text>   
        </View>
        <View>
          <Image style={styles.imgContainer} source={require('../assets/images/post1.jpg')} />
        </View>
        <View style={styles.actionBar}>
          <View style={styles.likesContainer}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'like')} style={styles.likesBtn} underlayColor='transparent'>
              <View>
                <Image source={require('../assets/buttons/likes.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35 }}/>
              </View>
            </TouchableHighlight>
            <Text style={styles.textStyle}>782 Likes</Text>
          </View>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'comment')} style={styles.commentBtn} underlayColor='transparent'>
            <View>
              <Image source={require('../assets/buttons/comment.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35 }}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{paddingLeft: 10, paddingRight: 10, color: '#4f4f4f'}}>Check out this awesome outfit I put together just now! #CatFashion #LookingPawsome #PicturePurrfect #PawsitiveBodyImage</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>Rickapod: </Text>
          <Text style={{paddingRight: 10, color: '#4f4f4f'}}>That outfit is super hot fire!</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>MrJonWu: </Text>
          <Text style={{paddingRight: 10, color: '#4f4f4f'}}>Where did you get it?</Text>
        </View>
      </View>
    );
  }
}
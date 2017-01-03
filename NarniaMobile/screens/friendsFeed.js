import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
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
  },
  imgContainer: {
    flex: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  likesContainer: {
    flex: 1,
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
        <View style={styles.likesContainer}>
          <Text style={styles.textStyle}>782 Likes</Text>
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

        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={require('../assets/images/thumbnail2.jpg')} />
          <Text style={styles.textStyle}>Timorous Tiger</Text>   
        </View>
        <View>
          <Image style={styles.imgContainer} source={require('../assets/images/post2.jpg')} />
        </View>
        <View style={styles.likesContainer}>
          <Text style={styles.textStyle}>368 Likes</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{paddingLeft: 10, paddingRight: 10, color: '#4f4f4f'}}>Check out this awesome outfit I put together just now! #CatFashion #LookingPawsome #PicturePurrfect #PawsitiveBodyImage</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>Haris: </Text>
          <Text style={{paddingRight: 10, color: '#4f4f4f'}}>I have the same dress!</Text>
        </View>

        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={require('../assets/images/thumbnail3.jpg')} />
          <Text style={styles.textStyle}>Lethargic Lion</Text>   
        </View>
        <View>
          <Image style={styles.imgContainer} source={require('../assets/images/post3.jpg')} />
        </View>
        <View style={styles.likesContainer}>
          <Text style={styles.textStyle}>399 Likes</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{paddingLeft: 10, paddingRight: 10, color: '#4f4f4f'}}>Check out this awesome outfit I put together just now! #CatFashion #LookingPawsome #PicturePurrfect #PawsitiveBodyImage</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>zacharyweidenbach: </Text>
          <Text style={{paddingRight: 10, color: '#4f4f4f'}}>I like what I see.</Text>
        </View>
      </View>
    );
  }
}
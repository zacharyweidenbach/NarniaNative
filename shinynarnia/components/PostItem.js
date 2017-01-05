import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Platform
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

export default function PostItem({ username, thumbnail, image, description, likes, comments }) {
  return (
    <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: thumbnail }} />
          <Text style={styles.username}>{username}</Text>   
        </View>
        <View>
          <Image style={styles.imgContainer} source={{uri: image }}  />
        </View>
        <View style={styles.actionBar}>
          <View style={styles.likesContainer}>
            <TouchableHighlight style={styles.likesBtn} underlayColor='transparent'>
              <View> 
                { Platform.OS === 'ios' ? <Ionicons name="ios-happy-outline" size={24}/> : <Ionicons name="ion-android-happy" size={24}/>}
              </View>
            </TouchableHighlight>
            <Text style={styles.textStyle}> {likes}</Text>
          </View>
          <View style={styles.commentsContainer}>
            <TouchableHighlight style={styles.commentBtn} underlayColor='transparent'>
              <View> 
                { Platform.OS === 'ios' ? <Ionicons name="ios-chatbubbles-outline" size={24}/> : <Ionicons name="ion-android-happy" size={24}/>}
              </View>
            </TouchableHighlight>
            <Text style={styles.textStyle}> {comments}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{paddingLeft: 10, paddingRight: 10, color: '#4f4f4f'}}>{description}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .3)',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    margin: 2,
  },
  imgContainer: {
    flex: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  descriptionContainer: {
    flex: 1,
  },
  thumbnail: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesBtn: {
    paddingLeft: 10,
  },
  commentBtn: {
    paddingLeft: 10,
  },
  actionBar: {
    //contains likesContainer, likesBtn, and commentBtn
    flex: 1,
    flexDirection: 'row',
  }
});

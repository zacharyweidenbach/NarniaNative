import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Component,
  Dimensions,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ff9554',
  },
  thumbnailContainer: {
    flex: 3,
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  statsContainer: {
    flex: 1, 
    flexDirection: 'row',
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

var ProfileStats = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{uri: props.profileImage}} />
      </View>
      <View style={styles.statsContainer}>
        <View>
          <Text style={styles.textStyle}>{props.followersCount}</Text>
          <Text style={styles.textStyle}>Followers</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>{props.postCount}</Text>
          <Text style={styles.textStyle}>Posts</Text>
        </View>
      </View>
    </View>
  );
};

module.exports = ProfileStats;
import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import {profileStatsStyles as styles} from '../stylesheet.js';

var ProfileStats = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{uri: props.profileImage}} />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.dynamicTextContainer}>
          <Text style={styles.dynamicTextStyle}>{props.followersCount}</Text>
          <Text style={styles.textStyle}>followers</Text>
        </View>
        <View style={styles.dynamicTextContainer}>
          <Text style={styles.dynamicTextStyle}>{props.postCount}</Text>
          <Text style={styles.textStyle}>posts</Text>
        </View>
      </View>
    </View>
  );
};

module.exports = ProfileStats;
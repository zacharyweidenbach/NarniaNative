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
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#fff',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

var SearchShopGallery = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post2.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post3.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post1.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post4.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post5.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post9.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post6.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post7.jpg')} />
      </View>
      <View>
        <Image style={styles.imgSmall} source={require('../assets/images/post8.jpg')} />
      </View>
    </View>
  );
};

module.exports = SearchShopGallery;
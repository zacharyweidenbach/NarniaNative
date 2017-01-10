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
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

var SearchShopGallery = (props) => {
  var clothing = props.items.map(function(item){
    return (
      <View style={styles.userContainer}>
        <Image style={styles.imgSmall} source={{uri: item}} />   
      </View>
    )
  });
  return (
    <View style={styles.container}>
      {clothing}
    </View>
  );
};

module.exports = SearchShopGallery;
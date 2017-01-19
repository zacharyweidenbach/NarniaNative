import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import {searchPeopleResult as styles} from '../stylesheet';

const SearchPeopleResult = (props) => {
  let onButtonPress = (button) => {
    switch (button) {
    case 'user':
      props.viewedUser(props.result.id);
      props.navigator.push({
        id: 'ProfileScreen'
      });
      break;
    }
  };

  return (  
    <TouchableHighlight style={styles.container} onPress={() => onButtonPress('user')} underlayColor='transparent'>
      <View style={styles.userContainer}>
        <Image style={styles.thumbnail} source={{uri: props.result.thumbnail}} />
        <Text style={styles.textStyle}>{props.result.username}</Text>   
      </View>
    </TouchableHighlight>
  );
};

export default SearchPeopleResult;
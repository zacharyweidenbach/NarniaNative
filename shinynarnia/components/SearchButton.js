import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

export default function SearchButton() {
  return (
      <TouchableOpacity
        onPress={() => console.log(Platform.OS)}
        style={styles.button}>
        <Ionicons name="ios-search" size={24} color="#fff"/>
      </TouchableOpacity>
  );
}

let MARGIN_RIGHT = Platform.OS === 'ios' ? 10 : 12;
let MARGIN_TOP = Platform.OS === 'ios' ? 10 : 16;

const styles = StyleSheet.create({
  button: {
    marginRight: MARGIN_RIGHT,
    marginTop: MARGIN_TOP
  }
});
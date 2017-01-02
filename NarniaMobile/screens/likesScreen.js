import Exponent from 'exponent';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import LikesGallery from './likesGallery';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  gallery: {
    flex: 12,
  },
  backBtn: {
    // position: 'absolute',
    left: -100, 
    // alignItems: 'center', 
    // paddingTop: 13,
  }
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class likesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <View>
              <Image source={require('../assets/buttons/back.png')} resizeMode={Image.resizeMode.contain} style={{ width: 26, height: 26}}/>
            </View>
          </TouchableHighlight>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>My Likes</Text>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            <LikesGallery />
          </ScrollView>
        </View>
      </View>
    );
  }
}
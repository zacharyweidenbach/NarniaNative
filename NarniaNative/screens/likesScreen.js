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
import Icon from 'react-native-vector-icons/Ionicons';
import LikesGallery from './likesGallery';
import ip from '../network.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: '#f9f7f5'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    // elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  gallery: {
    flex: 12,
  },
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  emptySpace: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
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
      likes: [],
      color: '#ff9554',
      likes: []
    };
    this.getLikedPostId = this.getLikedPostId.bind(this);
  }

  componentDidMount() {
    this.getLikedPostId();
  }

  getLikedPostId() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/findLikedPostId', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.userId,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => { that.setState({likes: resJSON}); })
    .catch((err) => console.log('error: ' + err));
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
            <Icon name="ios-arrow-back" size={38} color={this.state.color} />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>MY LIKES</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            {this.state.likes.length > 0 ? <LikesGallery likes={this.state.likes}/> : <View style={{alignItems: 'center', marginTop: 5}}><Text style={{color: '#888', fontSize: 16}}>No posts liked!</Text></View>}
          </ScrollView>
        </View>
      </View>
    );
  }
}
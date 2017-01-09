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
import ip from '../network.js';
import Auth from '../auth.js';

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
      id: ''
    };
    this.getLikedPostId = this.getLikedPostId.bind(this);
  }

  componentDidMount() {
    Auth.getId()
    .then(function(id) {
      this.setState({
        id: id
      });
      this.getLikedPostId();
    }.bind(this));
  }

  getLikedPostId() {
    console.log(this.state.id, 'ID IN getLikedPostId');
    var that = this;
    fetch('http://' + ip.address + ':3000/api/findLikedPostId', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.id,
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
            <View>
              <Image source={require('../assets/buttons/back.png')} resizeMode={Image.resizeMode.contain} style={{ width: 26, height: 26}}/>
            </View>
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>My Likes</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            {this.state.likes.length > 0 ? <LikesGallery likes={this.state.likes}/> : <View style={{alignItems:'center', marginTop: 5}}><Text style={{color:'#888', fontSize:16}}>No posts liked!</Text></View>}
          </ScrollView>
        </View>
      </View>
    );
  }
}
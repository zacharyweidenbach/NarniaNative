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
import ProfileGallery from './profileGallery';
import ProfileStats from './profileStats';

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
  scrollContainer: {
    flex: 12,
  },
  // profileStats: {
  //   // flex: 2,

  // },
  // gallery: {
  //   // flex: 2,
  // },
  backBtn: {
    // flex: 1,
    // position: 'absolute',
    left: -50,
    // alignItems: 'center',
    // paddingTop: 13,
  },
  menu: {
    right: -50
  }
});
const currentUser = 4;
const ipAddress = '10.6.19.12';
const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyArr: [],
      username: '',
      thumbnail: '',
    };
  }

  componentDidMount() {
    //this.props.id
    console.log(this.props.id, 'SELECTED ID');
    this.getLoggedInProfile();
  }

  getLoggedInProfile() {
    var that = this;
    fetch('http://' + ipAddress + ':3000/api/getLoggedInProfile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUser,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => { 
      var tempArr = [];
      for (var i = 0; i < resJSON.length; i++) {
        tempArr.push(resJSON[i].body);
      }
      that.setState({
        bodyArr: tempArr,
        username: resJSON[0].username,
        thumbnail: resJSON[0].thumbnail,
      });
    })
    .catch((err) => console.log('error: ' + err));
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'menu':
      this.props.navigator.push({
        id: 'ProfileMenu'
      });
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
          <Text style={{ fontWeight: 'bold', fontSize: 26}}>{this.state.username}</Text>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'menu')} underlayColor='transparent' style={styles.menu}>
            <View>
              <Image source={require('../assets/buttons/menu.png')} resizeMode={Image.resizeMode.contain} style={{ width: 26, height: 26}}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <ProfileStats profileImage={this.state.thumbnail} likesCount={this.state.bodyArr.length} postCount={this.state.bodyArr.length}/>
            <ProfileGallery userPosts={this.state.bodyArr} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
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
  Button
} from 'react-native';
import ProfileGallery from './profileGallery';
import ProfileStats from './profileStats';
import ip from '../network.js';
import Auth from '../auth.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f5',
    justifyContent: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
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
const currentUser = 4;
const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyArr: [],
      followers: [],
      username: '',
      thumbnail: ' ',
      following: false,
      LoggedInId: null,
      followerCount: 0
    };
  }

  componentWillMount() {
    Auth.getId()
    .then(function(resp) {
      this.setState({
        LoggedInId: resp
      });
      this.checkFollower(true);
    }.bind(this))

   
    this.getLoggedInProfile();
    this.getNumberOfFollowers();
  }

  getLoggedInProfile() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/getLoggedInProfile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.id,
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

  getNumberOfFollowers() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/getNumberOfFollowers', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.id,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      var tempArr = [];
      for (var i = 0; i < resJSON.length; i++) {
        tempArr.push(resJSON[i].followerId);
      }
      that.setState({
        followers: tempArr,
        followerCount: tempArr.length
      });
    })
    .catch((err) => console.log('error: ' + err));
  }

  checkFollower(init) {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/checkFollower', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.LoggedInId,
        followerId: this.props.id,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      console.log('resJSON', resJSON);
      if (init) {
        console.log('init true');
        if (resJSON.length > 0) {
          that.setState({following: true});
          console.log('state set to true');
        } else {
          that.setState({following: false});
          console.log('state set to false');
        }
      } else {
        if (resJSON.length > 0) {
          that.removeFollower();
        } else {
          that.addFollower();
        }
      }
    })
  }

  addFollower() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/addFollower', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.LoggedInId,
        followerId: this.props.id,
      })
    })
    .then(() => that.setState({following: true, followerCount: this.state.followerCount + 1}))
    .then(() => console.log('added follower'));
  }

  removeFollower() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/deleteFollower', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.LoggedInId,
        followerId: this.props.id,
      })
    })
    .then(() => that.setState({following: false, followerCount: this.state.followerCount - 1}))
    .then(() => console.log('removed follower'));
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
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.username}</Text>
          </View>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'menu')} underlayColor='transparent' style={styles.menu}>
            <View>
              <Image source={require('../assets/buttons/menu.png')} resizeMode={Image.resizeMode.contain} style={{ width: 30, height: 30}}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <ProfileStats profileImage={this.state.thumbnail} followersCount={this.state.followerCount} postCount={this.state.bodyArr.length}/>
            <View style={{backgroundColor:"#fff"}}>
              {this.state.LoggedInId !== this.props.id ? this.state.following ? <Button title='Unfollow' color='red' onPress={() => this.checkFollower()}></Button> : <Button title='Follow' color='green' onPress={() => this.checkFollower()}></Button> : null}
            </View> 
            <ProfileGallery userPosts={this.state.bodyArr} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
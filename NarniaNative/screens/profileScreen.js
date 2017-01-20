import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGallery from '../components/profileGallery';
import ProfileStats from '../components/profileStats';
import {POSTfetch} from '../utils.js';
import {profileScreenStyles as styles} from '../stylesheet.js';

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyArr: [],
      followers: [],
      username: '',
      thumbnail: ' ',
      following: false,
      followerCount: 0,
      color: '#ff9554',
      followerCount: 0
    };
  }

  componentWillMount() {
    if (this.props.userId) {
      this.checkFollower(true);
    }
    this.getLoggedInProfile();
    this.getNumberOfFollowers();
  }

  getLoggedInProfile() {
    var that = this;
    return POSTfetch('getLoggedInProfile', {
      userId: that.props.selectedId
    })
    .then((resJSON) => {
      if (resJSON.length > 0) {
        that.setState({
          bodyArr: resJSON,
          username: resJSON[0].username,
          thumbnail: resJSON[0].thumbnail,
        }); 
      } else {
        return POSTfetch('searchUserId', {
          id: that.props.selectedId
        })
        .then((resJSON) => {
          that.setState({
            username: resJSON[0].username,
            thumbnail: resJSON[0].thumbnail,
          });
        });
      }
    });
  }

  getNumberOfFollowers() {
    var that = this;
    return POSTfetch('getNumberOfFollowers', {
      userId: that.props.selectedId
    })
    .then((resJSON) => {
      var tempArr = [];
      for (var i = 0; i < resJSON.length; i++) {
        tempArr.push(resJSON[i].followerId);
      }
      that.setState({
        followers: tempArr,
        followerCount: tempArr.length
      });
    });
  }

  checkFollower(init) {
    var that = this;
    return POSTfetch('checkFollower', {
      userId: that.props.userId,
      followerId: that.props.selectedId,
    })
    .then((resJSON) => {
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
    });
  }

  addFollower() {
    var that = this;
    return POSTfetch('addFollower', {
      userId: that.props.userId,
      followerId: that.props.selectedId,
    })
    .then(() => that.setState({following: true, followerCount: this.state.followerCount + 1}))
    .then(() => console.log('added follower'));
  }

  removeFollower() {
    var that = this;
    return POSTfetch('deleteFollower', {
      userId: that.props.userId,
      followerId: that.props.selectedId,
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
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
              <Icon name="ios-arrow-back" size={38} color={this.state.color} />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.username}</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <ProfileStats profileImage={this.state.thumbnail} followersCount={this.state.followerCount} postCount={this.state.bodyArr.length}/>
            <View style={styles.whitebg}>
              {this.props.userId != this.props.selectedId ? this.state.following ? <Button title='Unfollow' color='#888' onPress={() => this.checkFollower()}></Button> : <Button title='Follow' color={this.state.color} onPress={() => this.checkFollower()}></Button> : null}
            </View>
            <ProfileGallery userId={this.props.userId} userPosts={this.state.bodyArr} viewedUser={this.props.viewedUser} navigator={this.props.navigator}/>
          </ScrollView>
        </View>
      </View>
    );
  }
}
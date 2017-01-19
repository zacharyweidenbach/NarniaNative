import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGallery from '../components/profileGallery';
import ProfileStats from '../components/profileStats';
import {profileMenuStyles as styles} from '../stylesheet.js';

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ff9554'
    };
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'search':
      this.props.navigator.push({
        id: 'SearchScreen'
      });
      break;
    case 'wardrobe':
      this.props.navigator.push({
        id: 'WardrobeScreen'
      });
      break;
    case 'camera':
      this.props.navigator.push({
        id: 'cameraScreen'
      });
      break;
    case 'likes':
      this.props.navigator.push({
        id: 'LikesScreen'
      });
      break;
    case 'mixer':
      this.props.navigator.push({
        id: 'MixerScreen'
      });
      break;
    case 'profile':
      this.props.viewedUser(this.props.userId);
      this.props.navigator.push({
        id: 'ProfileScreen'
      });
      break;
    }
  }

  logoutHandler() {
    this.props.destroySession()
    .then(function() {
      this.props.navigator.resetTo({
        id: 'Login'
      });
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <Icon name="ios-arrow-back" size={38} color={this.state.color} />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>MENU</Text>
          </View>
          <View style={styles.backBtn}>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <Button
              onPress={this.logoutHandler.bind(this)}
              title="Logout"
              color={this.state.color}
              accessibilityLabel="Logout"
            />
            <Button
              onPress={this.onButtonPress.bind(this, 'wardrobe')}
              title="Wardrobe"
              color={this.state.color}
              accessibilityLabel="Wardrobe"
            />
            <Button
              onPress={this.onButtonPress.bind(this, 'camera')}
              title="Add Personal Clothing to Wardrobe"
              color={this.state.color}
              accessibilityLabel="Add Personal Clothing to Wardrobe"
            />
            <Button
              onPress={this.onButtonPress.bind(this, 'search')}
              title="Search"
              color={this.state.color}
              accessibilityLabel="Search"
            />
            <Button
              onPress={this.onButtonPress.bind(this, 'likes')}
              title="Likes"
              color={this.state.color}
              accessibilityLabel="Likes"
            />
            <Button
              onPress={this.onButtonPress.bind(this, 'mixer')}
              title="Mixer"
              color={this.state.color}
              accessibilityLabel="Mixer"
            />
            <Button
              onPress={this.onButtonPress.bind(this, 'profile')}
              title="Profile"
              color={this.state.color}
              accessibilityLabel="Profile"
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
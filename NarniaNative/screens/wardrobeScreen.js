import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import {POSTfetch} from '../utils';
import {wardrobeScreen as styles} from '../stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

export default class WardrobeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wardrobe: []
    };
  }

  componentDidMount() {
    this.getWardrobe();
  }

  getWardrobe() {
    POSTfetch('getWardrobe', {userId: this.props.userId})
    .then((res) => this.setState({wardrobe: res}));
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
            <Icon name="ios-arrow-back" size={38} color='#ff9554' />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>WARDROBE</Text>
          </View>
          <View style={styles.emptySpace}></View>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            <View style={styles.scrollContainer}>
              {this.state.wardrobe.length > 0 ? this.state.wardrobe.map((clothing, key) => {
                if (key === 0) {
                  return <View key={key}><Image style={styles.imgLarge} source={{uri: clothing.largeImg}} /></View>;
                } else {
                  return <View key={key}><Image style={styles.imgSmall} source={{uri: clothing.largeImg}} /></View>;
                }
              }) : <Text style={styles.emptyText}>No items added!</Text>}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
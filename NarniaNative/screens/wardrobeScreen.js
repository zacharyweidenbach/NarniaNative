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
import ClothingModal from '../components/clothingModal';

export default class WardrobeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wardrobe: [],
      modalVisible: false
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

  handleClothingClick(clothing) {
    this.setState({currentClothing: clothing, modalVisible: true});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
              <Icon name="ios-arrow-back" size={38} color='#ff9554' />
            </TouchableHighlight>
          </View>
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
                  return <TouchableHighlight key={key} onPress={() => this.handleClothingClick(clothing)} underlayColor='transparent'><Image style={styles.imgLarge} source={{uri: clothing.largeImg}} /></TouchableHighlight>;
                } else {
                  return <TouchableHighlight key={key} onPress={() => this.handleClothingClick(clothing)} underlayColor='transparent'><Image style={styles.imgSmall} source={{uri: clothing.largeImg}} /></TouchableHighlight>;
                }
              }) : <Text style={styles.emptyText}>No items added!</Text>}
            </View>
          </ScrollView>
        </View>
        {/* Clothing Modal */}
        {this.state.modalVisible ? <ClothingModal userId={this.props.userId} clothing={this.state.currentClothing} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)} inShopGallery={false}/> : null}
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';
import ClothingModal from './clothingModal.js';


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#fff',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default class SearchShopGallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clothingInd: 0,
      modalVisible: false,
    }
  }

  onButtonPress(button, index) {
    switch (button) {
      case 'toggleModal':
        this.setState({clothingInd: index})
        //alert(this.props.items[this.state.clothingInd])
        this.setState({modalVisible: true});
        break;
    }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    var clothing = this.props.items.map(function(item, index){
      return (
        <View key={index}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'toggleModal', index)} underlayColor='transparent' >
            <Image style={styles.imgSmall} source={{uri: item.Image}} resizeMode={Image.resizeMode.contain}/>   
          </TouchableHighlight>
        </View>
      )
    }.bind(this));
    return (
      <View style={styles.container}>
        {clothing}
        {this.state.modalVisible ? <ClothingModal userId={this.props.userId} clothing={this.props.items[this.state.clothingInd]} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
      </View>
    );
  };
} 


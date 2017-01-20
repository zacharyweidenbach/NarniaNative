import React from 'react';
import { Alert, Modal, TouchableWithoutFeedback, View, Button, Text, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { clothingModalStyles as styles } from '../stylesheet.js';
import { POSTfetch } from '../utils.js';

const clothingModal = (props) => {
  let findClothingPosition = (clothing) => {
    var positionKey = {
      'SHIRT': 'top',
      'SHIRTS': 'top',
      'PANT': 'middle',
      'PANTS': 'middle',
      'SHOES': 'bottom',
    };
    return positionKey[clothing.productTypeName.toUpperCase()];
  };
  
  let onButtonPress = (button) => {
    switch (button) {
    case 'addToMixer':
        // TODO: Once mixer is universal, have this add the clothing to array
      break;
    case 'addToWardrobe':
      var body = {
        userId: props.userId,
        clothing: props.clothing,
        list: 'wardrobe',
        position: findClothingPosition(props.clothing)
      };
      return POSTfetch('addToWardrobe', body)
      .then((resJson) => {
        Alert.alert('Added to Wardrobe', props.clothing.title, () => {
          props.setModalVisible(false);
        });
      })
      .catch((error) => {
        console.error(error);
      });
      break;
    case 'buy':
      Linking.openURL(props.clothing.detailPageUrl).catch(err => console.error('An error occurred', err));
      break;
    }
  };
  
  return (
    <Modal animationType={'slide'} transparent={false} visible={props.modalVisible} >
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backBtnContainer}>
          <TouchableWithoutFeedback onPress={() => {
            props.setModalVisible(false);
          }}>
            <Icon name="ios-arrow-back" size={38} color='#ff9554' style={styles.backBtn}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.textcontainer} >
          <Text> {props.clothing.title} </Text>
      </View>
      <View>
        <Image style={styles.imgLarge} source={{uri: props.clothing.largeImg}} resizeMode={Image.resizeMode.contain} />
      </View>
      <View>
        {/* TODO: implementation of universal mixer
        <Button title="Add Outfit Mixer" onPress={this.onButtonPress.bind(this, 'addToMixer')} color='#ff9554' style={styles.button} />
        **/}
        {props.inShopGallery ? <Button title="Add to Wardrobe" onPress={() => onButtonPress('addToWardrobe')} color='#ff9554' style={styles.button} /> : null}
        <Button title="Buy" onPress={() => onButtonPress('buy')} color='#ff9554' style={styles.button}/>
      </View>
    </View>
  </Modal>
  );
};

export default clothingModal;
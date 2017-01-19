import React, { Component } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, View, Button, Text, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Auth from '../auth.js';
import { clothingModalStyles as styles } from '../stylesheet.js';
import { POSTfetch } from '../utils.js';

export default class clothingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  componentWillMount() {
    Auth.getId()
    .then(function(resp) {
      this.setState({
        id: resp
      });
    }.bind(this));
  }

  findClothingPosition(clothing) {
    var positionKey = {
      'SHIRT': 'top',
      'SHIRTS': 'top',
      'PANT': 'middle',
      'PANTS': 'middle',
      'SHOES': 'bottom',
    };

    return positionKey[clothing.ProductTypeName] || positionKey[clothing.productTypeName];
  }
  onButtonPress(button) {
    switch (button) {
    case 'addtoMixer':
        //once mixer is universal have this add the clothing to the mixer array at the proper position
      break;
    case 'addtoDream':
      //send data to server
      var body = {
        userId: this.props.userId,
        clothing: this.props.clothing,
        list: 'wardrobe',
        position: this.findClothingPosition(this.props.clothing)
      };
      return POSTfetch('addToWardrobe', body)
        .then((resJson) => {
          Alert.alert(this.props.clothing.Title + 'has been added to your Dreamrobe');
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    case 'buy':
      //send them to amazon item page
      Linking.openURL(this.props.clothing.DetailPageURL).catch(err => console.error('An error occurred', err));
      break;
    }
  }
  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
      >
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={() => {
            this.props.setModalVisible(false);
          }}>
            <Icon name="ios-close-circle" size={20} color='orange' style={styles.closeBtn}/>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.textcontainer} >
          <Text> {this.props.clothing.Title} </Text>
        </View>
        <View >
          <Image style={styles.imgLarge} source={{uri: this.props.clothing.Image}} resizeMode={Image.resizeMode.contain} />
        </View>
        <View>
          <Button title="Add Outfit Mixer" onPress={this.onButtonPress.bind(this, 'addtoMixer')} color='orange' style={styles.button} />
          <Button title="Add to Dreamrobe" onPress={this.onButtonPress.bind(this, 'addtoDream')} color='orange' style={styles.button} />
          <Button title="Buy" onPress={this.onButtonPress.bind(this, 'buy')} color='orange' style={styles.button}/>
        </View>
      </View>
    </Modal>
    );
  }
}
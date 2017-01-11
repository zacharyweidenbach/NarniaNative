import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Dimensions, ScrollView, Button, TextInput, Text, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';
import Auth from '../auth.js';


export default class clothingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:''
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

onButtonPress(button) {
  switch (button) {
    case 'addtoMixer':
      break;
   case 'addtoDream':
      //make call to 
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
        animationType={"slide"}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={() => {

            this.props.setModalVisible(false)
          }}>
             <Icon name="ios-close-circle" size={20} color='orange' style={{paddingTop: 10}}/>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.textcontainer} >
          <Text> {this.props.clothing.Title} </Text>
        </View>
        <View >
          <Image  style={styles.imgLarge} source={{uri: this.props.clothing.image}} resizeMode={Image.resizeMode.contain} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    // marginBottom: 0,
  },
  textcontainer: {
    flex:1,
    alignItems: 'center',
  },
  button: {
    color: 'orange',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderWidth: 1,
    borderColor: '#fff',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
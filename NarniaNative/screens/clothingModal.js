import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Dimensions, ScrollView, Button, TextInput, Text, Image} from 'react-native';
import Comment from './comment.js';
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
            <Text> x </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.textcontainer} >
          <Text> {this.props.clothing.Title} </Text>
        </View>
        <View >
          <Image  style={styles.imgLarge} source={{uri: this.props.clothing.image}} resizeMode={Image.resizeMode.contain} />
        </View>
        <View>
          <Button title="Add to Wishlist Wardrobe" /> 
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
  }
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
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImagePickerIOS, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class cameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    // this.chooseImageFromGallery = this.chooseImageFromGallery.bind(this);
    // this.chooseImageFromCamera = this.chooseImageFromCamera.bind(this);
  }

  componentDidMount() {
    console.log('Ok, I am running but there is something in the code not allowing the code to render, cameraScreen')
  }
  chooseImageFromGallery () {
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({image: imageUri});
    }, error => console.error('Error in cameraScreen.js in chooseImageFromGallery', error));
  }

  chooseImageFromCamera () {
    ImagePickerIOS.openCameraDialog({}, (imageUri) => {
      this.setState({image: imageUri});
    }, error => console.error('Error in cameraScreen.js in chooseImageFromCamera', error));
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'upload':
      //this will cause clothing upload modal to 
      break;
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <Icon name="ios-arrow-back" size={38} color='orange' />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Upload Clothes</Text>
          </View>
            <View style={{flex:1}}>
          </View>
        </View>
          {this.state.image?
            <View style={{flex:1}}>
              <Image style={{flex:1}} source={{uri:this.state.image}}/> 
              <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'upload')}>
                <Text> Upload Image </Text>
              </TouchableOpacity>
            </View>
            :null
          }
          
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromGallery.bind(this)}>
            <Text> Pick image form Camera Roll </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromCamera.bind(this)}>
            <Text> Take Picture </Text>
          </TouchableOpacity>
        </View>
      </View> 
    )
  }
}

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
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'orange',
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  },

});
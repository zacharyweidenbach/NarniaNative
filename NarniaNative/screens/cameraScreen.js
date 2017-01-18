import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImagePickerIOS, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Exif from 'react-native-exif'
import UserUploadModal from './userUploadModal.js'

export default class cameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      rotation: 0,
      modalVisible: false,
    };
    // this.chooseImageFromGallery = this.chooseImageFromGallery.bind(this);
    // this.chooseImageFromCamera = this.chooseImageFromCamera.bind(this);
  }

  componentDidMount() {
    console.log('Ok, I am running but there is something in the code not allowing the code to render, cameraScreen');
  }
  chooseImageFromGallery () {
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({image: imageUri})
    }, error => console.error('Error in cameraScreen.js in chooseImageFromGallery', error));
  }

  chooseImageFromCamera () {
    ImagePickerIOS.openCameraDialog({}, (imageUri) => {
      // console.warn('i made it here', imageUri)
      this.setState({rotation: 90, image: imageUri})
      // //the following will not run, won't even throw the catch. My guess is that the Exif function is struggling with the location of the taken picture
      // Exif.getExif(imageUri)
      // .then((msg) => {
      //   console.warn('ok:', msg.Orientation)
      //   if (JSON.stringify(msg.Orientation) === '0') {
      //     this.setState({rotation: 90, image: imageUri})
      //   } else if (JSON.stringify(msg.Orientation) === '1') {
      //     this.setState({rotation: 0, image: imageUri})
      //   } else if (JSON.stringify(msg.Orientation) === '2') {
      //     this.setState({rotation: 270, image: imageUri})
      //   } else if (JSON.stringify(msg.Orientation) === '3') {
      //     this.setState({rotation: 180, image: imageUri})
      //   }
      // })
      // .catch(function(msg){console.warn('ERROR: ' + msg)})
    }, error => console.error('Error in cameraScreen.js in chooseImageFromCamera', error));
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'upload':
      //this will cause clothing upload modal to render
      this.setState({modalVisible: true});
      break;
    case 'rotate':
      if (this.state.rotation <= 270){
        this.setState({rotation: this.state.rotation + 90})
      } else {
        this.setState({rotation: 0})
      }
      break;
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    var rotateImage = () => {
      return (
        <View style={[styles.container, {backgroundColor:"red"}]}>
          <Image style={{flex:2, transform:[{rotate:this.state.rotation + ' deg'}]}} source={{uri:this.state.image}} resizeMode={Image.resizeMode.contain}/> 
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <Icon name="ios-arrow-back" size={38} color='orange' />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Upload Clothes</Text>
          </View>
        </View>
          {this.state.image? rotateImage() :null}
          
         <View style={styles.buttonContainer}>
            {this.state.image?
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'upload')}>
                <Text> Upload Image </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'rotate')}>
                <Text> Rotate Image </Text>
              </TouchableOpacity>
              </View>
              :null
            }
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromGallery.bind(this)}>
            <Text> Pick image form Camera Roll </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromCamera.bind(this)}>
            <Text> Take Picture </Text>
          </TouchableOpacity>
        </View>
        {this.state.modalVisible ? <UserUploadModal userId={this.props.userId} image={this.state.image} rotation={this.state.rotation} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
      </View> 
    );
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
    flexDirection: 'row',
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
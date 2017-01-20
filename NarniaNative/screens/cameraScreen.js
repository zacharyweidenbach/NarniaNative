import React, { Component } from 'react';
import { Text, View, Image, ImagePickerIOS, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserUploadModal from '../components/userUploadModal.js';
import {cameraScreenStyles as styles} from '../stylesheet.js';

export default class cameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      rotation: 0,
      modalVisible: false,
    };
  }

  componentDidMount() {
    console.log('Ok, I am running but there is something in the code not allowing the code to render, cameraScreen');
  }
  chooseImageFromGallery () {
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({image: imageUri});
    }, error => console.log('Image Gallery closed, or Error in cameraScreen.js in chooseImageFromGallery: ', error));
  }

  chooseImageFromCamera () {
    ImagePickerIOS.openCameraDialog({}, (imageUri) => {
      this.setState({rotation: 90, image: imageUri});
    }, error => console.log('Device Camera closed, or Error in cameraScreen.js in chooseImageFromCamera: ', error));
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
      if (this.state.rotation <= 270) {
        this.setState({rotation: this.state.rotation + 90});
      } else {
        this.setState({rotation: 0});
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
          <Image style={[styles.img, {transform: [{rotate: this.state.rotation + ' deg'}]}]} source={{uri: this.state.image}} resizeMode={Image.resizeMode.contain}/> 
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
              <Icon name="ios-arrow-back" size={38} color='#ff9554' />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>UPLOAD CLOTHES</Text>
          </View>
          <View style={styles.emptySpace}></View>
        </View>
        <View style={styles.imageContainer}>
          {this.state.image ? rotateImage() : null}
          
        </View>
           <View style={styles.buttonContainer}>
              {this.state.image ?
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'upload')}>
                  <Icon name='ios-cloud-upload-outline' size={38} color='#ff9554'/>
                  <Text style={styles.iconText}> Upload </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'rotate')}>
                  <Icon name='ios-refresh-circle-outline' size={38} color='#ff9554'/>
                  <Text style={styles.iconText}> Rotate </Text>
                </TouchableOpacity>
                </View>
                : null
              }
          </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromGallery.bind(this)}>
            <Icon name='ios-images-outline' size={38} color='#ff9554'/>
             <Text style={styles.iconText}> Pick Photo </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromCamera.bind(this)}>
            <Icon name='ios-camera-outline' size={38} color='#ff9554'/>
             <Text style={styles.iconText}> Take Photo </Text>
          </TouchableOpacity>
        </View>
        {this.state.modalVisible ? <UserUploadModal userId={this.props.userId} image={this.state.image} rotation={this.state.rotation} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
      </View> 
    );
  }
}


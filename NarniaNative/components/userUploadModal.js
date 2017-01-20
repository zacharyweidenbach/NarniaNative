import React, { Component } from 'react';
import { Alert, ActivityIndicator, Modal, Picker, TouchableHighlight, View, Dimensions, Button, TextInput, Text, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';
import Auth from '../auth.js';
// import DropDown, { Select, Option, OptionList, updatePosition } from 'react-native-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userUploadModalStyles as styles } from '../stylesheet.js';
import { POSTfetch } from '../utils.js';


export default class userUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      brand: '',
      description: '',
      color: '',
      material: '',
      productTypeName: '',
      tags: '',
      upc: '',
      department: '',
      url: '',
      loading: false,
    };
  }

  // componentDidMount() {
    // updatePosition(this.refs['SELECT1']);
    // updatePosition(this.refs['OPTIONLIST']);
  // }
  onButtonPress(button) {
    switch (button) {
    case 'upload':
      this.setState({loading: true});
      var title = this.state.title;
      var dateNow = Date.now();
      var userImage = {
        uri: this.props.image,
        type: 'image/jpeg',
        name: title + dateNow + '.jpeg'
      };

      var uploadBody = new FormData();
      uploadBody.append('userImage', userImage);
      //send information to the server for uploading the clothes into the database
      fetch('http://' + ip.address + ':3000/api/clothingImgUpload', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: uploadBody
      }).then((res) => { return res.json(); })
        .then((resJson) => {
          if (resJson.imageUrl) {
            var body = { 
              clothing: { 
                title: this.state.title, 
                brand: this.state.brand,
                description: this.state.description,
                color: this.state.color,
                material: this.state.material,
                productTypeName: this.state.productTypeName,
                upc: this.state.upc,
                department: this.state.department,
                detailPageUrl: this.state.url,
                largeImg: resJson.imageUrl,
              },
              userId: this.props.userId,
              tags: this.state.tags,
              list: 'wardrobe'
            };
            return POSTfetch('userUpload', body)
            .then((resJson) => {
              this.setState({loading: false});
              Alert.alert('Upload Success', 'Your clothing has been successfully added to your wardrobe', [{text: 'OK', onPress: () => { this.props.setModalVisible(false); } }]);
            })
            .catch((error) => {
              console.error(error);
            });
          } else if (!resJson.imageUrl) {
            this.onButtonPress('upload');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
  }
  // _getOptionList() {
  //   return this.refs['OPTIONLIST'];
  // }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
      >
        <View stye={styles.container}>
          <View style={styles.header}>
            <View style={styles.emptySpace}>
              <TouchableHighlight onPress={() => { this.props.setModalVisible(false); }} underlayColor='transparent' style={styles.backBtn}>
                  <Icon name="ios-arrow-back" size={38} color='#ff9554' />
                </TouchableHighlight>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>CLOTHING FORM</Text>
            </View>
            <View style={styles.emptySpace}>
            </View>
          </View>
        <KeyboardAwareScrollView>
          <View>
            <Image style={[styles.img, {transform: [{rotate: this.props.rotation + ' deg'}]}]} source={{uri: this.props.image}} resizeMode={Image.resizeMode.contain} />
          </View>
          <View style={styles.form} >
            <View style={styles.input}>
              <Text style={styles.text}>Clothing Type</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(productTypeName) => this.setState({productTypeName})}
                value={this.state.productTypeName}
                placeholder='Type of clothing? ("Shirt, Pants, Shoes, etc")'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Title</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                placeholder='Give your clothing a title'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Department</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(department) => this.setState({department})}
                value={this.state.department}
                placeholder='Womens, Mens, Boys , Girls, etc...'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Description</Text>
              <TextInput 
                style={styles.descriptionText}
                multiline={true}
                onChangeText={(description) => this.setState({description})}
                value={this.state.description}
                placeholder='(optional)Describe your clothing'
                plaholderTextColor='#ff9554'
                />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Brand</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(brand) => this.setState({brand})}
                value={this.state.brand}
                placeholder='(optional)'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Color</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(color) => this.setState({color})}
                value={this.state.color}
                placeholder='(optional)'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Tags</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(tags) => this.setState({tags})}
                value={this.state.tags}
                placeholder='(optional) i.e #winter, #fuzzy, #playful, etc...'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Url</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(url) => this.setState({url})}
                value={this.state.url}
                placeholder='(optional) Url where this could be purchased?'
                plaholderTextColor='#ff9554'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>UPC</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(upc) => this.setState({upc})}
                value={this.state.upc}
                placeholder='(optional) Universal Product Code if known?'
                plaholderTextColor='#ff9554'
              />
            </View>
          </View>
          {this.state.loading ? <View style={styles.loading}><ActivityIndicator style={styles.activityIndicator} size="large" color='#ff9554'/></View> : null}
          <Button title="Add clothing to your Wardrobe" onPress={this.onButtonPress.bind(this, 'upload')} color='#ff9554' style={styles.button}/>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  }
}

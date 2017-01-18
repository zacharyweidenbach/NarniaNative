import React, { Component } from 'react';
import { Alert, Modal, Picker, TouchableWithoutFeedback, View, StyleSheet, Dimensions, ScrollView, Button, TextInput, Text, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';
import Auth from '../auth.js';
import DropDown, { Select, Option, OptionList, updatePosition } from 'react-native-dropdown';

export default class userUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Testing title',
      brand: 'Tester',
      description: 'this is a test',
      color: 'testesq',
      material: '',
      productTypeName: 'Shirt',
      tags: '',
      upc: '',
      department: 'Mens',
      url: '',
    };
  }

  componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }
  onButtonPress(button) {
    switch (button) {
    case 'upload':
      var title = this.state.title;
      var dateNow = Date.now();
      var userImage = {
        uri: this.props.image,
        type: 'image/jpeg',
        name: title + dateNow + '.jpeg'
      };
      // var userUpload = {
      //   title: this.state.title,
      //   brand: this.state.brand,
      //   description: this.state.description,
      //   color: this.state.color,
      //   material: this.state.material,
      //   productTypeName: 'Shirt',
      //   tags: this.state.tags,
      //   upc: this.state.upc,
      //   department: 'Mens',
      //   url: this.state.url,
      // }

      var uploadBody = new FormData();
      uploadBody.append('brand', this.state.brand);
      uploadBody.append('userImage', userImage);
      console.warn(JSON.stringify(uploadBody));
      //send information to the server for uploading the clothes into the database
      // var xhr = new XMLHttpRequest()
      // xhr.open('POST', 'http://' + ip.address + ':3000/api/userUpload');
      // xhr.setRequestHeader('content-type', 'multipart/form-data');
      // xhr.send(uploadBody)
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
            fetch('http://' + ip.address + ':3000/api/userUpload', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                clothing: {
                  title: this.state.title, 
                  brand: this.state.brand,
                  description: this.state.description,
                  color: this.state.color,
                  material: this.state.material,
                  productTypeName: 'Shirt',
                  upc: this.state.upc,
                  department: 'Mens',
                  detailPageUrl: this.state.url,
                  largeImg: resJson.imageUrl,
                },
                userId: this.props.userId,
                tags: this.state.tags,
                list: 'wardrobe'
              })
            })
            .then((res) => { return res.json(); })
            .then((resJson) => {
              console.warn('successful clothing upload', resJson);
              // Alert('Your clothing has been successfully added to your wardrobe')
              // this.props.setModalVisible(false)
            })
            .catch((error) => {
              console.error(error);
            });
          } else if (!resJson.imageUrl) {
            console.warn('there is NO url');
            this.onButtonPress('upload');
          }
        })
        .catch((error) => {
          console.warn('multer failed');
          console.error(error);
        });
      break;
    }
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { alert('Modal has been closed.'); }}
      >
        <View stye={styles.container}>
          <View style={styles.header}>
            <View>
              <TouchableWithoutFeedback onPress={() => {
                this.props.setModalVisible(false);
              }}>
                 <Icon name="ios-close-circle" size={20} color='orange' />
              </TouchableWithoutFeedback>
              <Text> Clothing Upload Form </Text>
            </View>
          </View>
        <ScrollView>
          <View>
            <Image style={[styles.img, {transform: [{rotate: this.props.rotation + ' deg'}]}]} source={{uri: this.props.image}} resizeMode={Image.resizeMode.contain} />
          </View>
          <View style={styles.form} >
             <View style={styles.picker}>
              <Text style={styles.text}>Clothing Type</Text>
              <Select
                ref="SELECT1"
                style={{flex: 1, zIndex: 25}}
                optionListRef={this._getOptionList.bind(this)}
                defaultValue="Select clothing type..."
                onSelect={(productTypeName) => this.setState({productTypeName})}>
                <Option>Shirt</Option>
                <Option>Pants</Option>
                <Option>Shoes</Option>
              </Select>
              <OptionList ref="OPTIONLIST"/>
            </View> 
            <View style={styles.input}>
              <Text style={styles.text}>Title</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                placeholder='Give your article of clothing a title'
                plaholderTextColor='orange'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Description</Text>
              <TextInput 
                style={[styles.text, {flex: 4}]}
                multiline={true}
                onChangeText={(description) => this.setState({description})}
                value={this.state.description}
                placeholder='Give your article of clothing a description(optional)'
                plaholderTextColor='orange'
                />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Brand</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(brand) => this.setState({brand})}
                value={this.state.brand}
                placeholder='If known, what brand is the clothing?(optional)'
                plaholderTextColor='orange'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Color</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(color) => this.setState({color})}
                value={this.state.color}
                placeholder='What color is the clothing?(optional)'
                plaholderTextColor='orange'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Tags</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(tags) => this.setState({tags})}
                value={this.state.tags}
                placeholder='What tags should be associated with this article of clothing?(optional)'
                plaholderTextColor='orange'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Url</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(url) => this.setState({url})}
                value={this.state.url}
                placeholder='Do you know the url where this could be purchased?(optional)'
                plaholderTextColor='orange'
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>UPC</Text>
              <TextInput 
                style={styles.text}
                onChangeText={(upc) => this.setState({upc})}
                value={this.state.upc}
                placeholder='Do you known the UPC(universal product code) of the clothing?(optional)'
                plaholderTextColor='orange'
              />
            </View>
            
             <View style={styles.picker}>
              <Text style={styles.text}>Clothing Type</Text>
             <Picker
            style={[styles.picker, {padding: 10, margin: 10}]}
            selectedValue={this.state.productTypeName}
            onValueChange={(productTypeName) => this.setState({productTypeName})}>
            <Picker.Item label="Shirt" value="Shirt" />
            <Picker.Item label="Pants" value="Pants" />
            <Picker.Item label="Shoes" value="Shoes" />
            </Picker>
            </View>
          </View>
          <Button title="Add clothing to your Wardrobe" onPress={this.onButtonPress.bind(this, 'upload')} color='orange' style={{color: 'orange'}}/>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20, 
    paddingLeft: 5,
  },
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: {
    height: 15,
    color: 'orange',
  },
  form: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // flexDirection: 'column',
  },
  input: {
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    margin: 5,
    height: 40,
    width: Dimensions.get('window').width,
  },
  picker: {
    flex: 2,
    width: Dimensions.get('window').width,
    height: 40,
  },

});
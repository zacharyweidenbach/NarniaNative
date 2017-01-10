import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, Dimensions, Image, TouchableHighlight, TextInput } from 'react-native';
import ip from '../network.js';


export default class Mixer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      topImages: [{ URL: 'http://clothing.beautysay.net/wp-content/uploads/images/red-shirt-mens-1.jpg'}, { URL: 'https://s-media-cache-ak0.pinimg.com/736x/c6/8d/c2/c68dc2038bb0791ae00e98179e00bd7f.jpg'}, { URL: 'http://www.cotondoux.com/23514-thickbox/chemise-homme-coupe-cintree-bourgogne-.jpg'}],
      midImages: [{ URL: 'https://images-na.ssl-images-amazon.com/images/I/410WYjhVEtL.jpg'},{ URL: 'https://images-na.ssl-images-amazon.com/images/I/41PWqy28FtL.jpg'},{ URL: 'https://images-na.ssl-images-amazon.com/images/I/41HdkQOWkzL.jpg'}],
      bottomImages: [{ URL: 'http://www.svrimaging.com/images/puma/Puma-Speed-Cat-Big-Red-Shoes-Mens-For-Men_2.jpg'},{ URL: 'http://www.aepic.fr/images/large/aepic/New_Arrived_Puma_90_2013_Men_Red_White_Shoes_1_1_LRG.jpg'},{ URL: 'http://www.vizitkz.com/images/Tods-Herren-Fahren-Rot-Schuhe-Iconic-online-Basel.jpg'},{ URL: 'http://i1076.photobucket.com/albums/w458/robertben100/MensShoes/sem061712/DSC04139.jpg'}],
      topIndex: 0,
      midIndex: 0,
      bottomIndex: 0,
      description: '',
    }
  }

  componentWillMount(){
    return fetch('http://' + ip.address + ':3000/api/clothing', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((res) => {return res.json()})
      .then((resJson) => {
        var topImgs = [];
        var midImgs = [];
        var bottomImgs = [];
        for (var i = 0; i < resJson.length; i ++) {
          if (resJson[i].position === 'top') {
            topImgs.push({URL: resJson[i].largeImg, id:resJson[i].id});
          } else if (resJson[i].position === 'mid') {
            midImgs.push({URL: resJson[i].largeImg, id:resJson[i].id});
          } else if (resJson[i].position === 'bottom') {
            bottomImgs.push({URL: resJson[i].largeImg, id:resJson[i].id});
          } 
        }
        this.setState({topImages: topImgs, midImages: midImgs, bottomImages: bottomImgs})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onButtonPress(button) {
    switch (button) {
      case 'back':
        this.props.navigator.pop();
        break;
      case 'topLess':
        console.log("decrease press", this.state.topIndex)
        if (this.state.topIndex > 0) {
          this.setState({topIndex: this.state.topIndex-=1})
        }
        break;
      case 'topMore':
        console.log("increase press", this.state.topImages)
        if (this.state.topIndex < this.state.topImages.length -1) {
          this.setState({topIndex: this.state.topIndex+=1})
        }
        break;
      case 'midLess':
         if (this.state.midIndex > 0) {
          this.setState({midIndex: this.state.midIndex-=1})
        }
        break;
      case 'midMore':
        if (this.state.midIndex < this.state.midImages.length -1) {
          this.setState({midIndex: this.state.midIndex+=1})
        }
        break;
      case 'bottomLess':
         if (this.state.bottomIndex > 0) {
          this.setState({bottomIndex: this.state.bottomIndex-=1})
        }
        break;
      case 'bottomMore':
        if (this.state.bottomIndex < this.state.bottomImages.length -1) {
          this.setState({bottomIndex: this.state.bottomIndex+=1})
        }
        break;
      case 'post':
        console.log('posty posty posty')
        var time = new Date();
        fetch("http://10.6.21.47:3000/api/postToDB", {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            userId: 3,
            likesCount: 0,
            body: this.state.topImages[this.state.topIndex].URL,
            shirtId: this.state.topImages[this.state.topIndex].id,
            pantId: this.state.midImages[this.state.midIndex].id,
            shoesId: this.state.bottomImages[this.state.bottomIndex].id,
            description: this.state.description,
            type: 'image', 
            createdAt: time
            })
        }).then((res) => res.json())
          .then((resJson) => {
            console.log(resJson)
            Alert.alert('You have successfully posted your outfit')
            this.props.navigator.pop()
          })
          .catch((error) => {
            console.error(error)
          })
        break;
    }
  }
  render() { 
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <View>
              <Image source={require('../assets/buttons/back.png')} resizeMode={Image.resizeMode.contain} style={{ width: 26, height: 26}}/>
            </View>
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Mixer</Text>
          </View>
          <View style={styles.emptySpace}>
          </View>
        </View>
          <View style={styles.tuserContainer}>
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'topLess')}  underlayColor='transparent' >
              <Text>p</Text>
            </TouchableHighlight>
            <Image style={styles.imgSmall} source={{uri: this.state.topImages[this.state.topIndex].URL}} /> 
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'topMore')}  underlayColor='transparent' >
              <Text>p</Text>
            </TouchableHighlight>  
          </View>
          <View style={styles.muserContainer}>
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'midLess')}  underlayColor='transparent' >
              <Text>p</Text>
            </TouchableHighlight>
            <Image style={styles.imgSmall} source={{uri: this.state.midImages[this.state.midIndex].URL}} resizeMode={Image.resizeMode.contain} /> 
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'midMore')}  underlayColor='transparent' >
              <Text>p</Text>
            </TouchableHighlight>   
          </View>
          <View style={styles.buserContainer}>
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'bottomLess')}  underlayColor='transparent' >
              <Text>p</Text>
            </TouchableHighlight> 
            <Image style={styles.imgSmall} source={{uri: this.state.bottomImages[this.state.bottomIndex].URL}} resizeMode={Image.resizeMode.contain} />   
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'bottomMore')}  underlayColor='transparent' >
              <Text>p</Text>
            </TouchableHighlight> 
          </View>
        <View class="footer" style={styles.footer}>
            <TextInput placeholder='Post Description' style={styles.descriptionBar} onChangeText = {(description) => this.setState({description})} value={this.state.description} />
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'post')} underlayColor='transparent'>
            <View style={styles.post}>
              <Image source={require('../assets/buttons/post.png')} resizeMode={Image.resizeMode.contain} style={{ width: 35, height: 35}}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    // elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 20,
  },
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  emptySpace: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  },
  tuserContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
  muserContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buserContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    left: 50,
    height: 125,
    width: 125,
    borderRadius: 25,
  },
  imgSmall: {
    flex: 1,
    width: Dimensions.get('window').width / 2,
    height: 200,
    borderWidth: 1,
    borderColor: '#fff',
  },
  chevron: {
    width : Dimensions.get('window').width / 4,
    // height: Dimensions.get('window').height / 3,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  descriptionBar: {
    flex: 1,
    flexDirection: 'row',
  },
  post: {
    flex: 1,
    flexDirection: 'row',
  }
});
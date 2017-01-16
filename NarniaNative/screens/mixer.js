import React, { Component } from 'react';
import { Alert, AlertIOS, Text, View, StyleSheet, ScrollView, Dimensions, Image, TouchableHighlight, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';


export default class Mixer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      topImages: [{ URL: 'http://clothing.beautysay.net/wp-content/uploads/images/red-shirt-mens-1.jpg'}, { URL: 'https://s-media-cache-ak0.pinimg.com/736x/c6/8d/c2/c68dc2038bb0791ae00e98179e00bd7f.jpg'}, { URL: 'http://www.cotondoux.com/23514-thickbox/chemise-homme-coupe-cintree-bourgogne-.jpg'}],
      midImages: [{ URL: 'https://images-na.ssl-images-amazon.com/images/I/410WYjhVEtL.jpg'}, { URL: 'https://images-na.ssl-images-amazon.com/images/I/41PWqy28FtL.jpg'}, { URL: 'https://images-na.ssl-images-amazon.com/images/I/41HdkQOWkzL.jpg'}],
      bottomImages: [{ URL: 'http://www.svrimaging.com/images/puma/Puma-Speed-Cat-Big-Red-Shoes-Mens-For-Men_2.jpg'}, { URL: 'http://www.aepic.fr/images/large/aepic/New_Arrived_Puma_90_2013_Men_Red_White_Shoes_1_1_LRG.jpg'}, { URL: 'http://www.vizitkz.com/images/Tods-Herren-Fahren-Rot-Schuhe-Iconic-online-Basel.jpg'}, { URL: 'http://i1076.photobucket.com/albums/w458/robertben100/MensShoes/sem061712/DSC04139.jpg'}],
      topIndex: 0,
      midIndex: 0,
      bottomIndex: 0,
      description: '',
      color: '#ff9554',
      wardrobe: [],
      hashtags: [],
      postId: 0,
    };
  }

  componentWillMount() {
    this.fetchMixerImages();
    this.fetchWardrobe();
  }

  fetchWardrobe() {
    var that = this;
    return fetch('http://' + ip.address + ':3000/api/getWardrobe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: that.props.userId,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => that.setState({wardrobe: resJSON}))
    .catch((err) => console.error(err));
  }

  fetchMixerImages() {
    return fetch('http://' + ip.address + ':3000/api/clothing', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((res) => { return res.json(); })
      .then((resJSON) => {
        var topImgs = [];
        var midImgs = [];
        var bottomImgs = [];
        for (var i = 0; i < resJSON.length; i ++) {
          if (resJSON[i].position === 'top') {
            topImgs.push({URL: resJSON[i].largeImg, id: resJSON[i].id});
          } else if (resJSON[i].position === 'mid') {
            midImgs.push({URL: resJSON[i].largeImg, id: resJSON[i].id});
          } else if (resJSON[i].position === 'bottom') {
            bottomImgs.push({URL: resJSON[i].largeImg, id: resJSON[i].id});
          } 
        }
        this.setState({topImages: topImgs, midImages: midImgs, bottomImages: bottomImgs});
      })
      .catch((error) => console.error(error));
  }

  changeMixerDisplay(clothing) {
    var position = this.findClothingPosition(clothing);
    switch (position) {
      case 'top':
        this.state.topImages.push({URL: clothing.largeImg});
        this.setState({topIndex: this.state.topImages.length - 1});
        break;
      case 'middle':
        this.state.midImages.push({URL: clothing.largeImg});
        this.setState({midIndex: this.state.midImages.length - 1});
        break;
      case 'bottom':
        this.state.bottomImages.push({URL: clothing.largeImg});
        this.setState({bottomIndex: this.state.bottomImages.length - 1});
        break;
    }
  }

  findClothingPosition(clothing) {
    var positionKey = {
      'SHIRT': 'top',
      'SHIRTS': 'top',
      'PANT': 'middle',
      'PANTS': 'middle',
      'SHOES': 'bottom',
    };

    return positionKey[clothing.productTypeName];
  }

  postMixerOutfit(description) {
    var today = new Date;
    return fetch("http://" + ip.address + ":3000/api/postToDB", {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        userId: this.props.userId,
        likesCount: 0,
        body: this.state.topImages[this.state.topIndex].URL,
        shirtId: this.state.topImages[this.state.topIndex].id,
        pantId: this.state.midImages[this.state.midIndex].id,
        shoesId: this.state.bottomImages[this.state.bottomIndex].id,
        description: description,
        type: 'image', 
        createdAt: today.getTime(),
      })
    }).then((res) => res.json())
      .then((resJson) => {
        Alert.alert('You have successfully posted your outfit!');
        this.props.navigator.pop();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'topLess':
      console.log('decrease press', this.state.topIndex);
      if (this.state.topIndex > 0) {
        this.setState({topIndex: this.state.topIndex -= 1});
      }
      break;
    case 'topMore':
      console.log('increase press', this.state.topImages);
      if (this.state.topIndex < this.state.topImages.length - 1) {
        this.setState({topIndex: this.state.topIndex += 1});
      }
      break;
    case 'midLess':
      if (this.state.midIndex > 0) {
        this.setState({midIndex: this.state.midIndex -= 1});
      }
      break;
    case 'midMore':
      if (this.state.midIndex < this.state.midImages.length - 1) {
        this.setState({midIndex: this.state.midIndex += 1 });
      }
      break;
    case 'bottomLess':
      if (this.state.bottomIndex > 0) {
        this.setState({bottomIndex: this.state.bottomIndex -= 1});
      }
      break;
    case 'bottomMore':
      if (this.state.bottomIndex < this.state.bottomImages.length - 1) {
        this.setState({bottomIndex: this.state.bottomIndex += 1});
      }
      break;
    case 'post':
      AlertIOS.prompt('Enter a post message...', null, (msg) => {
        this.insertPost(msg);
      });
      break;
    }
  }

  insertPost(message) {
    // var that = this;
    var today = new Date;
    var msg = message;
    fetch('http://' + ip.address + ':3000/api/postToDB', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        userId: this.props.userId,
        likesCount: 0,
        body: this.state.topImages[this.state.topIndex].URL,
        shirtId: this.state.topImages[this.state.topIndex].id,
        pantId: this.state.midImages[this.state.midIndex].id,
        shoesId: this.state.bottomImages[this.state.bottomIndex].id,
        description: msg,
        type: 'image', 
        createdAt: today.getTime()
      })
    }).then((res) => res.json())
        .then((resJson) => {
          // console.log(resJson);
          this.setState({postId: resJson.insertId}, function() {
            this.parseDescriptionForTags(msg);
          });
          Alert.alert('You have successfully posted your outfit');
          this.props.navigator.pop();
        })
        .catch((error) => {
          console.error(error);
        });
  }

  parseDescriptionForTags(message) {
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var hashtag;
    while ((hashtag = regex.exec(message))) {
      matches.push(hashtag[1].toLowerCase());
    }
    if (matches.length > 0) {
      this.insertTags(matches);
      this.setState({hashtags: matches});
    }
  }

  insertTags(arr) {
    console.log(arr);
    fetch('http://' + ip.address + ':3000/api/insertTags', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matches: arr
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      // console.log('success resJson', resJson);
      // console.log(this.state.hashtags);
      this.joinPostTags();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  joinPostTags() {
    fetch('http://' + ip.address + ':3000/api/joinPostTags', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hashtags: this.state.hashtags,
        postId: this.state.postId
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      // console.log(resJson);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  insertTags(arr) {
    console.log(arr);
    fetch('http://' + ip.address + ':3000/api/insertTags', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matches: arr
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      // console.log('success resJson', resJson);
      // console.log(this.state.hashtags);
      this.joinPostTags();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  joinPostTags() {
    fetch('http://' + ip.address + ':3000/api/joinPostTags', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hashtags: this.state.hashtags,
        postId: this.state.postId
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      // console.log(resJson);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() { 
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <Icon name="ios-arrow-back" size={38} color={this.state.color} />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Mixer</Text>
          </View>
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'post')} underlayColor='transparent'>
              <Icon name="ios-add-circle-outline" size={38} color={this.state.color} />
            </TouchableHighlight>
          </View>
        </View>
          <View style={styles.tuserContainer}>
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'topLess')} underlayColor='transparent' >
              <Icon name="ios-arrow-dropleft" size={38} color={this.state.color} />
            </TouchableHighlight>
            <Image style={styles.imgSmall} source={{uri: this.state.topImages[this.state.topIndex].URL}} /> 
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'topMore')} underlayColor='transparent' >
              <Icon name="ios-arrow-dropright" size={38} color={this.state.color} />
            </TouchableHighlight>  
          </View>
          <View style={styles.muserContainer}>
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'midLess')} underlayColor='transparent' >
              <Icon name="ios-arrow-dropleft" size={38} color={this.state.color} />
            </TouchableHighlight>
            <Image style={styles.imgSmall} source={{uri: this.state.midImages[this.state.midIndex].URL}} resizeMode={Image.resizeMode.contain} /> 
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'midMore')} underlayColor='transparent' >
              <Icon name="ios-arrow-dropright" size={38} color={this.state.color} />
            </TouchableHighlight>   
          </View>
          <View style={styles.buserContainer}>
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'bottomLess')} underlayColor='transparent' >
              <Icon name="ios-arrow-dropleft" size={38} color={this.state.color} />
            </TouchableHighlight> 
            <Image style={styles.imgSmall} source={{uri: this.state.bottomImages[this.state.bottomIndex].URL}} resizeMode={Image.resizeMode.contain} />   
            <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'bottomMore')} underlayColor='transparent' >
              <Icon name="ios-arrow-dropright" size={38} color={this.state.color} />
            </TouchableHighlight> 
          </View>
        <View class="footer" style={styles.footer}>
          {/*<TextInput placeholder='Post Description' style={styles.descriptionBar} onChangeText = {(description) => this.setState({description})} value={this.state.description} />*/}
          <ScrollView horizontal={true}>
            <View style={styles.scrollContainer}>
              {this.state.wardrobe.length > 0 ? this.state.wardrobe.map((clothing, key) => {
                return <TouchableHighlight onPress={() => this.changeMixerDisplay(clothing)} key={key}><Image style={styles.thumbnail} source={{uri: clothing.largeImg}}/></TouchableHighlight>
              }) : <View style={{alignItems: 'center', marginLeft: 5}}><Text style={{color: '#888'}}>No items in wardrobe!</Text></View>}
            </View>
          </ScrollView>
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
    width: Dimensions.get('window').width / 4,
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
  },
  thumbnail: {
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
    // marginTop: 1,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
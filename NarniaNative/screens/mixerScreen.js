import React, { Component } from 'react';
import { Alert, AlertIOS, Text, View, ScrollView, Image, TouchableHighlight, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';
import { mixerStyles as styles } from '../stylesheet.js';
import { POSTfetch } from '../utils.js';

export default class MixerScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      topImages: [{}],
      midImages: [{}],
      bottomImages: [{}],
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
    // this.fetchMixerImages();
    this.fetchWardrobe();
  }

  fetchWardrobe() {
    return POSTfetch('getWardrobe', {userId: this.props.userId})
    .then((resJSON) => this.setState({wardrobe: resJSON}))
    .catch((err) => console.error(err));
  }

  // fetchMixerImages() {
  //   // return POSTfetch('clothing')
  //   return fetch('http://' + ip.address + ':3000/api/clothing', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   }).then((res) => { return res.json(); })
  //     .then((resJSON) => {
  //       var topImgs = [];
  //       var midImgs = [];
  //       var bottomImgs = [];
  //       for (var i = 0; i < resJSON.length; i ++) {
  //         if (resJSON[i].position === 'top') {
  //           topImgs.push({URL: resJSON[i].largeImg, id: resJSON[i].id});
  //         } else if (resJSON[i].position === 'mid') {
  //           midImgs.push({URL: resJSON[i].largeImg, id: resJSON[i].id});
  //         } else if (resJSON[i].position === 'bottom') {
  //           bottomImgs.push({URL: resJSON[i].largeImg, id: resJSON[i].id});
  //         }
  //       }
  //       this.setState({topImages: topImgs, midImages: midImgs, bottomImages: bottomImgs});
  //     })
  //     .catch((error) => console.error(error));
  // }

  changeMixerDisplay(clothing) {
    var position = this.findClothingPosition(clothing);
    switch (position) {
    case 'top':
      this.state.topImages.push({URL: clothing.largeImg, id: clothing.id});
      this.setState({topIndex: this.state.topImages.length - 1});
      break;
    case 'middle':
      this.state.midImages.push({URL: clothing.largeImg, id: clothing.id});
      this.setState({midIndex: this.state.midImages.length - 1});
      break;
    case 'bottom':
      this.state.bottomImages.push({URL: clothing.largeImg, id: clothing.id});
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
      'SHOE': 'bottom',
    };

    return positionKey[clothing.productTypeName.toUpperCase()];
  }

  insertPost(message) {
    // var that = this;
    var today = new Date;
    var msg = message;
    var body = {
      userId: this.props.userId,
      likesCount: 0,
      body: this.state.topImages[this.state.topIndex].URL,
      shirtId: this.state.topImages[this.state.topIndex].id,
      pantId: this.state.midImages[this.state.midIndex].id,
      shoesId: this.state.bottomImages[this.state.bottomIndex].id,
      description: msg,
      type: 'image',
      createdAt: today.getTime()
    };
    return POSTfetch('postToDB', body)
      .then((resJson) => {
        this.setState({postId: resJson.insertId}, function() {
          this.parseDescriptionForTags(msg);
        });
        Alert.alert('You have successfully posted your outfit');
        this.props.navigator.pop();
      })
      .catch((error) => {
        console.log(error);
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
    return POSTfetch('insertTags', {matches: arr})
    .then((resJson) => {
      this.joinPostTags();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  joinPostTags() {
    var body = {
      hashtags: this.state.hashtags,
      postId: this.state.postId
    };
    return POSTfetch('joinPostTags', body)
    .then((resJson) => {
      console.log(resJson);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    case 'topLess':
      if (this.state.topIndex > 0) {
        this.setState({topIndex: this.state.topIndex -= 1});
      }
      break;
    case 'topMore':
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

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <View style={styles.emptySpace}>
            <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
              <Icon name="ios-arrow-back" size={38} color={this.state.color} />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>MIXER</Text>
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
            <Image style={styles.imgSmall} source={{uri: this.state.topImages[this.state.topIndex].URL}} resizeMode={Image.resizeMode.contain} />
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
          <ScrollView horizontal={true}>
            <View style={styles.scrollContainer}>
              {this.state.wardrobe.length > 0 ? this.state.wardrobe.map((clothing, key) => {
                return <TouchableHighlight underlayColor='transparent' onPress={() => this.changeMixerDisplay(clothing)} key={key}><Image style={styles.thumbnail} source={{uri: clothing.largeImg}} resizeMode={Image.resizeMode.contain}/></TouchableHighlight>;
              }) : <View style={styles.emptyWardrobe}><Text style={styles.emptyWardrobeText}>No items in wardrobe!</Text></View>}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

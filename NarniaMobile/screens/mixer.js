import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  tuserContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingTop: 30,
  },
  muserContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  buserContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  thumbnail: {
    left: 50,
    height: 125,
    width: 125,
    borderRadius: 25,
  },
  imgSmall: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  chevron: {
    width : Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 3,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

export default class Mixer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      topImages: ['http://clothing.beautysay.net/wp-content/uploads/images/red-shirt-mens-1.jpg', 'https://s-media-cache-ak0.pinimg.com/736x/c6/8d/c2/c68dc2038bb0791ae00e98179e00bd7f.jpg', 'http://www.cotondoux.com/23514-thickbox/chemise-homme-coupe-cintree-bourgogne-.jpg'],
      midImages: ['https://images-na.ssl-images-amazon.com/images/I/410WYjhVEtL.jpg','https://images-na.ssl-images-amazon.com/images/I/41PWqy28FtL.jpg','https://images-na.ssl-images-amazon.com/images/I/41HdkQOWkzL.jpg'],
      bottomImages: ['http://www.svrimaging.com/images/puma/Puma-Speed-Cat-Big-Red-Shoes-Mens-For-Men_2.jpg','http://www.aepic.fr/images/large/aepic/New_Arrived_Puma_90_2013_Men_Red_White_Shoes_1_1_LRG.jpg','http://www.vizitkz.com/images/Tods-Herren-Fahren-Rot-Schuhe-Iconic-online-Basel.jpg','http://i1076.photobucket.com/albums/w458/robertben100/MensShoes/sem061712/DSC04139.jpg'],
      topIndex: 0,
      midIndex: 0,
      bottomIndex: 0,
    }
  }

  onButtonPress(button) {
    switch (button) {
      case 'topLess':
        console.log("decrease press", this.state.topIndex)
        if (this.state.topIndex > 0) {
          this.setState({topIndex: this.state.topIndex-=1})
        }
        break;
      case 'topMore':
        console.log("increase press", this.state.topIndex)
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
    }
  }
  render() { 
    return (
      <View style={styles.container} >
        <View style={styles.tuserContainer}>
          <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'topLess')} >
            <Ionicons name="ios-arrow-dropleft" size={32} color="orange" />
          </TouchableHighlight>
          <Image style={styles.imgSmall} source={{uri: this.state.topImages[this.state.topIndex]}} /> 
          <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'topMore')} >
            <Ionicons name="ios-arrow-dropright" size={32} color="orange" />
          </TouchableHighlight>  
        </View>
        <View style={styles.muserContainer}>
          <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'midLess')} >
            <Ionicons name="ios-arrow-dropleft" size={32} color="orange" />
          </TouchableHighlight>
          <Image style={styles.imgSmall} source={{uri: this.state.midImages[this.state.midIndex]}} /> 
          <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'midMore')} >
            <Ionicons name="ios-arrow-dropright" size={32} color="orange" />
          </TouchableHighlight>   
        </View>
        <View style={styles.buserContainer}>
          <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'bottomLess')} >
            <Ionicons name="ios-arrow-dropleft" size={32} color="orange" />
          </TouchableHighlight> 
          <Image style={styles.imgSmall} source={{uri: this.state.bottomImages[this.state.bottomIndex]}} />   
          <TouchableHighlight style={styles.chevron} onPress={this.onButtonPress.bind(this, 'bottomMore')} >
            <Ionicons name="ios-arrow-dropright" size={32} color="orange" />
          </TouchableHighlight> 
        </View>
      </View>
    );
  }
}
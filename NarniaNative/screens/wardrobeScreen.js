import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Button,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileGallery from './profileGallery';
import ip from '../network.js';

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
  thumbnailContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 150,
    width: 150,
  },
  scrollContainer: {
    flex: 12,
  },
  backBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#ff9554'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  }
});

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ' ',
      thumbnail: ' ',
      wardrobe: []
    };
  }

  componentDidMount() {
    this.getWardrobe();
  }

  getLoggedInProfile() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/getLoggedInProfile', {
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
    .then((resJSON) => {
      that.setState({
        username: resJSON[0].username,
        thumbnail: resJSON[0].thumbnail,
      }); 
    })
  }

  getWardrobe() {
    var that = this;
    fetch('http://' + ip.address + ':3000/api/getWardrobe', {
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
    .then(() => console.log('wardrobe state', that.state.wardrobe, that.state.wardrobe.length, that.state.wardrobe[0]))
    .catch((err) => console.error(err));
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'back')} underlayColor='transparent' style={styles.backBtn}>
            <Icon name="ios-arrow-back" size={38} color='#ff9554' />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Wardrobe</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            {this.state.wardrobe.length > 0 ? this.state.wardrobe.map((clothing) => {
              return <Image style={styles.thumbnail} source={{uri: clothing.largeImg}}/>
            }) : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}
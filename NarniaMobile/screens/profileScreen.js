import Exponent from 'exponent';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import ProfileGallery from './profileGallery';
import ProfileStats from './profileStats';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 12,
  },
  // profileStats: {
  //   // flex: 2,

  // },
  // gallery: {
  //   // flex: 2,
  // },
  backBtn: {
    // flex: 1,
    // position: 'absolute',
    left: -50,
    // alignItems: 'center', 
    // paddingTop: 13,
  },
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: 'http://www.safarickszoo.com/wp-content/uploads/2014/03/ocelot2.jpg',
      likesCount: 8723,
      postCount: 9,
    };
  }
  
  componentDidMount() {

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
            <View>
              <Image source={require('../assets/buttons/back.png')} resizeMode={Image.resizeMode.contain} style={{ width: 26, height: 26}}/>
            </View>
          </TouchableHighlight>
          <Text style={{ fontWeight: 'bold', fontSize: 26}}>Outrageous Ocelot</Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <ProfileStats profileImage={this.state.profileImage} likesCount={this.state.likesCount} postCount={this.state.postCount}/>
            <ProfileGallery />
          </ScrollView>
        </View>
      </View>
    );
  }
}
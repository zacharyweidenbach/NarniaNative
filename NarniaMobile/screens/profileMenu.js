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
  Button,
} from 'react-native';
import ProfileGallery from './profileGallery';
import ProfileStats from './profileStats';
import Auth from '../auth.js';

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
    // paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ff9554'
  },
  scrollContainer: {
    paddingTop: 20,
    flex: 12,
    // fontSize: 80
  },
  backBtn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
  }
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class profileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onButtonPress(button) {
    switch (button) {
    case 'back':
      this.props.navigator.pop();
      break;
    }
  }

  logoutHandler() {
    Auth.destroySession()
    .then(function() {
      this.props.navigator.push({
        id: 'Login'
      });
    }.bind(this));
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
          <View style={styles.textContainer}>
            <Text style={styles.text}>Menu</Text>
          </View>  
          <View style={styles.backBtn}>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <Button
              onPress={this.logoutHandler.bind(this)}
              title="Logout"
              color="#ff9554"
              accessibilityLabel="Logout"
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
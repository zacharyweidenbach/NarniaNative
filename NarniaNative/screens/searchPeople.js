import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default class SearchPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.triggerSearch != this.props.triggerSearch && nextProps.index === 0) {
      // console.log('wait')
      // console.log('wait')
      // console.log('wait')
      // console.log('wait')
      // console.log('new index', this.props.index)
      // console.log('there was a change in the props', this.props.triggerSearch)
    }
  } 
  // onNamePress() {
  //   this.props.navigator.push({
  //     id: 'ProfileScreen'
  //   });
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={require('../assets/images/thumbnail3.jpg')} />
          <Text style={styles.textStyle}>Lethargic Lion</Text>   
        </View>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={require('../assets/images/thumbnail.jpg')} />
          <Text style={styles.textStyle}>Outrageous Ocelot</Text>   
        </View>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={require('../assets/images/thumbnail2.jpg')} />
          <Text style={styles.textStyle}>Timorous Tiger</Text>   
        </View>
      </View>
    ); 
  }
}

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import SearchShopGallery from './searchShopGallery';

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
    left: 50,
    height: 125,
    width: 125,
    borderRadius: 25,
  },
});

export default class SearchShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      page: '1',
      items: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 2) {
      this.setState({keyword: nextProps.triggerSearch});
      setTimeout(function() {this.FetchAmazon()}.bind(this), 1);
    }
  } 

  FetchAmazon () {
    //change the path of this request to match the server IP address
    this.setState({items: []});
    return fetch('http://10.6.21.47:3000/api/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({keyword: this.state.keyword, page: this.state.page})
    }).then((res) => res.json())
      .then((resJson) => {
        this.setState({items: this.state.items.concat(resJson)});
        console.log(this.state.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // onNamePress() {
  //   this.props.navigator.push({
  //     id: 'ProfileScreen'
  //   });
  // }
  render() {
    return (
      <View style={styles.container}>
        <SearchShopGallery items={this.state.items} />
        
      </View>
    ); 
  }
}

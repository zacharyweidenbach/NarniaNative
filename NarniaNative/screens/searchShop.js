import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';

import SearchShopGallery from './searchShopGallery';
import ip from '../network.js';

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
      page: 1,
      items: [],
      loading: false,
      clothing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 2) {
      this.setState({keyword: nextProps.triggerSearch, page: '1', loading:true});
      setTimeout(function() {this.FetchAmazon()}.bind(this), 1);
    }
  }

  FetchAmazon (nextProps) {
    //change the path of this request to match the server IP address
    this.setState({items: [], clothing:false});
    return fetch('http://' + ip.address + ':3000/api/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({keyword: this.state.keyword, page: this.state.page})
    }).then((res) => { console.log('returned'); return res.json(); })
      .then((resJson) => {
        this.setState({items: this.state.items.concat(resJson), loading:false, clothing:true});
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

  onButtonPress(button) {
    switch (button) {
      case 'next':
        this.setState({page: +this.state.page + 1, loading:true});
        setTimeout(function() {this.FetchAmazon()}.bind(this), 1);
        break;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <ActivityIndicator style={[styles.centering, styles.gray]} size="large" color="orange"/> :null}
        <SearchShopGallery userId={this.props.userId} items={this.state.items} />
        {this.state.clothing ? <Button title='More results...' onPress={this.onButtonPress.bind(this, 'next')} color='orange' />:null}
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import SearchShopGallery from './searchShopGallery';
import {POSTfetch} from '../utils';
import {searchShop as styles} from '../stylesheet';

export default class SearchShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      page: 1,
      items: [],
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 2) {
      this.setState({
        items: [], 
        keyword: nextProps.triggerSearch, 
        page: 1, 
        loading: true }, () => this.searchAmazon());
    }
  }

  searchAmazon () {
    POSTfetch('search', {keyword: this.state.keyword, page: this.state.page})
    .then((res) => this.setState({items: this.state.items.concat(res), loading: false}));
  }

  onRefresh() {
    if (this.state.page < 10 && this.state.items.length >= 10) {
      this.setState({page: this.state.page + 1, loading: true}, () => this.searchAmazon());
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchShopGallery userId={this.props.userId} items={this.state.items} refresh={this.onRefresh.bind(this)}/>
        {this.state.loading ? 
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator style={styles.activityIndicator} size='large' color='#ff9554'/>
          </View> : null}
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View } from 'react-native';

import SearchTagsResults from './searchTagsResults';
import {POSTfetch} from '../utils';
import {searchTags as styles} from '../stylesheet';

export default class SearchTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  
  shouldComponentUpdate() {
    return true;
  } 

  componentDidUpdate(nextProps) {
    if (this.props.triggerSearch !== '' && nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 1) {
      this.fetchTags(this.props.triggerSearch);
    }
  }

  fetchTags(searchText) {
    POSTfetch('fetchTags', {tag: this.parseSearchForTags(searchText)})
    .then((res) => this.setState({tags: res}));
  }

  parseSearchForTags(searchText) {
    var regex = /\w+/gm;
    var matches = searchText.match(regex);

    if (matches.length === 1) {
      return matches[0];
    } else {
      return matches.join('');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.tags.length > 0 ? this.state.tags.map((tag, key) => {
          return <SearchTagsResults tag={tag} key={key} userId={this.props.userId}/>;
        }) : null}
      </View>
    ); 
  }
}

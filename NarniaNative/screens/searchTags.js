import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import SearchTagsResults from './searchTagsResults';
import ip from '../network';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  tagContainer: {
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

export default class SearchTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  } 

  componentDidUpdate(nextProps) {
    if (this.props.triggerSearch !== '' && nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 1) {
      this.fetchTags(this.props.triggerSearch);
    }
  }

  fetchTags(search) {
    var tag = this.parseSearchForTags(search);

    return fetch('http://' + ip.address + ':3000/api/fetchTags', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag: tag,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      this.setState({tags: resJSON});
    })
    .then(() => console.log('tags', this.state.tags))
    .catch((err) => console.log('error: ' + err));
  }

  parseSearchForTags(message) {
    var regex = /\w+/gm;
    var matches = message.match(regex);

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
          return <SearchTagsResults tag={tag} key={key} userId={this.props.userId}/>
        }) : null }
      </View>
    ); 
  }
}

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  countStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#888'
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  thumbnail: {
    marginLeft: 10,
  },
});

export default class SearchTagsResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: '',
      color: '#ff9554',
    };
  }

  onButtonPress(button) {
    switch (button) {
    case 'tag':
      this.props.navigator.push({
        id: 'ProfileScreen'
      });
      break;
    }
  }

  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={() => console.warn(this.props.tag.id)} underlayColor='transparent'>
          <View style={styles.tagContainer}>
            <View style={styles.thumbnail}>
              <Text style={{color: this.state.color, fontSize: 36}}>#</Text>
            </View>
            <Text style={styles.textStyle}>{this.props.tag.tag}</Text>
            <Text style={styles.countStyle}>{this.props.tag.count} posts</Text>   
          </View>
      </TouchableHighlight>
    );
  }
};
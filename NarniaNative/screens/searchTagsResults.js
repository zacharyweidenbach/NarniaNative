import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import TagsModal from './tagsModal.js';

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
      color: '#ff9554',
      currentTag: null,
      tagsModalVisible: false
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

  handleTagClick(tag) {
    this.setState({currentTag: tag, tagsModalVisible: true});
  }

  setModalVisible(visible) {
    this.setState({tagsModalVisible: visible});
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={styles.container} onPress={() => this.handleTagClick(this.props.tag)} underlayColor='transparent'>
            <View style={styles.tagContainer}>
              <View style={styles.thumbnail}>
                <Text style={{color: this.state.color, fontSize: 36}}>#</Text>
              </View>
              <Text style={styles.textStyle}>{this.props.tag.tag}</Text>
              <Text style={styles.countStyle}>{this.props.tag.count} posts</Text>   
            </View>
        </TouchableHighlight>
        {this.state.tagsModalVisible ? <TagsModal userId={this.props.userId} tag={this.state.currentTag} modalVisible={this.state.tagsModalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
      </View>
    );
  }
};
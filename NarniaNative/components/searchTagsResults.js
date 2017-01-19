import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {searchTagsResults as styles} from '../stylesheet';
import TagsModal from './tagsModal';

export default class SearchTagsResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTag: null,
      tagsModalVisible: false
    };
  }
  
  handleTagClick(tag) {
    this.setState({currentTag: tag, tagsModalVisible: true});
  }

  setModalVisible(visible, screen) {
    switch (screen) {
    case 'tagsModal':
      this.setState({tagsModalVisible: visible});
      break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Tag Result */}
        <TouchableHighlight onPress={() => this.handleTagClick(this.props.tag)} underlayColor='transparent'>
            <View style={styles.tagContainer}>
              <View style={styles.thumbnail}>
                <Text style={styles.tagFont}>
                  #
                </Text>
              </View>
              <Text style={styles.textStyle}>
                {this.props.tag.tag}
              </Text>
              <Text style={styles.countStyle}>
                {this.props.tag.count} posts
              </Text>   
            </View>
        </TouchableHighlight>
        {/* Tags Modal */}
        {this.state.tagsModalVisible ? <TagsModal userId={this.props.userId} tag={this.state.currentTag} modalVisible={this.state.tagsModalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
      </View>
    );
  }
}
import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';

import SearchPeopleResult from '../components/searchPeopleResult';
import {searchPeople as styles} from '../stylesheet';
import {POSTfetch} from '../utils';

export default class SearchPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.triggerSearch !== '' && nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 0) {
      this.searchUser(this.props.triggerSearch);
    }
  }

  searchUser(username) {
    this.setState({results: []});
    
    POSTfetch('searchUser', {username: username})
    .then((res) => this.setState({results: res}));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
         {this.state.results.map((result, key) => {
           return <SearchPeopleResult key={key} result={result} navigator={this.props.navigator} viewedUser={this.props.viewedUser}/>;
         })}
      </ScrollView>
    ); 
  }
}
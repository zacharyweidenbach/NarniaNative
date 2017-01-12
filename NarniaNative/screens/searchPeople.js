import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import SearchPeopleResult from './searchPeopleResult';
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
      results: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  fetchUserData(username) {
    this.setState({results: []});
    fetch('http://' + ip.address + ':3000/api/searchUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      })
    })
    .then((res) => res.json())
    .then((resJSON) => {
      this.setState({results: resJSON});
    })
    .catch((err) => console.log('error: ' + err));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
         {this.state.results.map((result, key) => {
           return (<SearchPeopleResult key={key} result={result} navigator={this.props.navigator} viewedUser={this.props.viewedUser}/>);
         })}
      </ScrollView>
    ); 
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.triggerSearch !== '' && nextProps.triggerSearch !== this.props.triggerSearch && nextProps.index === 0) {
      this.fetchUserData(this.props.triggerSearch);
    }
  }

}

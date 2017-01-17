import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Dimensions, ScrollView, Button, TextInput, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ip from '../network.js';

export default class tagsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    this.getPostsByTag();
  }

  getPostsByTag() {
    var that = this;
    return fetch('http://' + ip.address + ':3000/api/getPostsFromTag', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tagId: this.props.tag.id})
    })
    .then((res) => res.json())
    .then((resJSON) => that.setState({posts: resJSON}))
    .catch((err) => console.warn(err));
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.tagsModalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={() => {this.props.setModalVisible(false, 'tagsModal')}}>
             <Icon name="ios-close-circle" size={20} color='orange' style={{paddingTop: 10}}/>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.textContainer} >
          <Text style={styles.text}> #{this.props.tag.tag} </Text>
        </View>
        <View style={styles.gallery}>
          <ScrollView>
            <View style={styles.scrollContainer}>
              {this.state.posts.length > 0 ? this.state.posts.map((post, key) => {
                return <View key={key}><Image style={styles.imgSmall} source={{uri: post.body}} /></View>;
              }) : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  textContainer: {
    flex:1,
    alignItems: 'center',
  },
  text: {
    color: '#ff9554',
    fontSize: 24,
    fontWeight: 'bold'
  },
  gallery: {
    flex: 12,
    backgroundColor: '#f9f7f5'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#f9f7f5',
  },
});
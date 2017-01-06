import React, { Component } from 'react';
import { Modal, Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import PostItemMore from './PostItemMore.js';
import { Ionicons } from '@exponent/vector-icons';

export default class SearchModal extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          >
         <View style={styles.container}>
          <View style={styles.actionBar}>
            
            <TouchableOpacity style={styles.btn} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Ionicons name="ios-close" size={34} color="#ff9554" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="ios-happy-outline" size={32} color="#ff9554" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="ios-person-add-outline" size={34} color="#ff9554" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="ios-add-outline" size={36} color="#ff9554" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <PostItemMore
                  username="Outrageous Ocelot"
                  thumbnail="http://icons.iconarchive.com/icons/sonya/swarm/256/Cat-icon.png"
                  image="https://s24.postimg.org/3pegwwhxx/post1.jpg"
                  description="Check out this awesome outfit I put together just now! #CatFashion #LookingPawsome #PicturePurrfect"
                  likes={279}
                  comments={19}
                  onPress={() => console.log('hi')}
                /> 
          </ScrollView>
         </View>
        </Modal>

        <TouchableWithoutFeedback onPress={() => {
          this.setModalVisible(true)
        }}>
          <View>
            <Text>Show Modal</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 6,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  btn: {
    justifyContent: 'flex-end',
  },
});
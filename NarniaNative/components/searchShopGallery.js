import React, { Component } from 'react';
import {
  View,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

import ClothingModal from '../components/clothingModal.js';
import {searchShopGallery as styles} from '../stylesheet';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SearchShopGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clothingIndex: 0,
      modalVisible: false,
      clothing: [],
      dataSource: dataSource.cloneWithRows([]),
    };
  }

  shouldComponentUpdate() {
    return true;
  } 

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items.length > 0 && prevProps.items !== this.props.items) {
      this.setState({clothing: this.props.items}, () => {
        this.setState({dataSource: dataSource.cloneWithRows(this.state.clothing)});
      });
    }   
  }

  onButtonPress(button, index) {
    switch (button) {
    case 'clothingModal':
      this.setState({clothingIndex: index, modalVisible: true});
      break;
    }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView 
        contentContainerStyle={styles.listContainer}
        enableEmptySections={true}
        onEndReached={() => this.props.refresh()}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) => 
          <TouchableHighlight onPress={this.onButtonPress.bind(this, 'clothingModal', rowID)} underlayColor='transparent'>
             <Image style={styles.imgSmall} source={{uri: rowData.largeImg}} resizeMode={Image.resizeMode.contain}/>   
          </TouchableHighlight>} 
        />
        {/* Clothing Modal */}
        {this.state.modalVisible ? <ClothingModal userId={this.props.userId} clothing={this.props.items[this.state.clothingIndex]} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)} inShopGallery={true}/> : null}
      </View>
    );
  }
} 
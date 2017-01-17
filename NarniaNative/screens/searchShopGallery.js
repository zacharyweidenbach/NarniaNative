import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';
import ClothingModal from './clothingModal.js';


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: '#f9f7f5',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    // backgroundColor: '#f9f7f5',
  },
  imgLarge: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    // borderWidth: 1,
    // borderColor: '#f9f7f5',
  },
  imgSmall: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    // borderWidth: 1,
    // borderColor: '#f9f7f5',
  },
});
var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class SearchShopGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clothingInd: 0,
      modalVisible: false,
      clothing: [],
      dataSource: dataSource.cloneWithRows([]),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  } 

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items.length > 0 && prevProps.items !== this.props.items) {
      this.setState({clothing: this.props.items}, function() {
        // console.log(this.state.clothing);
        this.setState({dataSource: dataSource.cloneWithRows(this.state.clothing)});
      });
    }   
    // if (prevProps.post !== this.props.post) {
    //   this.setState({likesCount: this.props.post.likesCount});
    //   this.checkInitialLike();
    // }
  }

  onButtonPress(button, index) {
    switch (button) {
    case 'toggleModal':
      this.setState({clothingInd: index});
      //alert(this.props.items[this.state.clothingInd])
      this.setState({modalVisible: true});
      break;
    }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    // var clothing = this.props.items.map(function(item, index) {
    //   return (
    //     <View key={index}>
    //       <TouchableHighlight onPress={this.onButtonPress.bind(this, 'toggleModal', index)} underlayColor='transparent' >
    //         <Image style={styles.imgSmall} source={{uri: item.Image}} resizeMode={Image.resizeMode.contain}/>   
    //       </TouchableHighlight>
    //     </View>
    //   );
    // }.bind(this));
    var clothing = <ListView contentContainerStyle={styles.listContainer}
            // refreshControl={ <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} tintColor="#ff9554" /> }
            enableEmptySections={true}
            onEndReached={() => this.props.refresh()}
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionID, rowID) => <TouchableHighlight onPress={this.onButtonPress.bind(this, 'toggleModal', rowID)} underlayColor='transparent' >
             <Image style={styles.imgSmall} source={{uri: rowData.Image}} resizeMode={Image.resizeMode.contain}/>   
           </TouchableHighlight>} />;
    return (
      <View style={styles.container}>
        {clothing}
        {this.state.modalVisible ? <ClothingModal userId={this.props.userId} clothing={this.props.items[this.state.clothingInd]} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)}/> : null}
      </View>
    );
  }
} 


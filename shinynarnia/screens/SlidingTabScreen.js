import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation';

import ActionButton from 'react-native-action-button';
import PostItem from '../components/PostItem.js';
import SearchButton from '../components/SearchButton.js';
import SearchModal from '../components/SearchModal.js';

export default class SlidingTabScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Narnia',
      backgroundColor: '#ff9554',
      renderRight: () => <SearchButton />,
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  goToTab = (tab) => {
    this.props.navigation.performAction(({ tabs, stacks }) => {
      tabs('sliding-tab-navigation').jumpToTab(tab);
    });
  }

  renderLabel = ({route}) => {
    let title;
    if (route.key === 'feed') {
      title = 'feed';
    } else if (route.key === 'trending') {
      title = 'trending';
    } else if (route.key === 'likes') {
      title = 'likes';
    }
    return <Text style={styles.tabLabel}>{title.toUpperCase()}</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        {/*Parent View*/}
        <SlidingTabNavigation
          id="sliding-tab-navigation"
          navigatorUID="sliding-tab-navigation"
          initialTab="feed"
          renderLabel={this.renderLabel}
          barBackgroundColor="#fff"
          indicatorStyle={styles.tabIndicator}>
          {/*Feed Tab*/}
          <SlidingTabNavigationItem id="feed">
            <View style={styles.tabContainer}>
              <ScrollView>
                <PostItem
                  username="Outrageous Ocelot"
                  thumbnail="http://icons.iconarchive.com/icons/sonya/swarm/256/Cat-icon.png"
                  image="https://s24.postimg.org/3pegwwhxx/post1.jpg"
                  description="Check out this awesome outfit I put together just now! #CatFashion #LookingPawsome #PicturePurrfect"
                  likes={279}
                  comments={19}
                  onPress={() => console.log('hi')}
                /> 
                <PostItem
                  username="Bobby McBobby Pants"
                  thumbnail="https://s-media-cache-ak0.pinimg.com/564x/12/f6/d1/12f6d18125126757df29e733051697b8.jpg"
                  image="https://s28.postimg.org/ndz74weql/post2.jpg"
                  description="Life sucks. So like me! #iamcat"
                  likes={582}
                  comments={33}
                  onPress={() => console.log('hi')}
                />  
              </ScrollView>
            </View>
          </SlidingTabNavigationItem>
          {/*Trending Tab*/}
          <SlidingTabNavigationItem id="trending">
            <View style={styles.tabContainer}>
            </View>
          </SlidingTabNavigationItem>
        {/*Likes Tab*/}
          <SlidingTabNavigationItem id="likes">
            <View style={styles.tabContainer}>
              <SearchModal />
            </View>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>
        {/*Action Button (must be below </SlidingTabNavigation>)*/}
        <ActionButton 
          buttonColor="#ff9554"
          onPress={() => { console.log("hi")} }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0f0f0',
  },
  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: '#000',
  },
  tabIndicator: {
    backgroundColor: '#ff9554',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: '#0084FF',
  },
});

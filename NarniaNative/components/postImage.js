import React, { Component } from 'react';

import {View, Image} from 'react-native';

//Stateless component that needs _style and post passed in from the parent component
const PostImage = (props) => (
  <View style={props._style.outfitContainer}>
    {props.post.shirtImg
    ? (<Image style={props._style.imgOutfitContainer} source={{uri: props.post.shirtImg}} resizeMode={Image.resizeMode.contain}/>)
    : (<Image style={props._style.imgContainer} source={{uri: props.post.body}} resizeMode={Image.resizeMode.contain}/>)}
    {props.post.pantImg
    ? (<Image style={props._style.imgOutfitContainer} source={{uri: props.post.pantImg}} resizeMode={Image.resizeMode.contain}/>) : null}
    {props.post.shoesImg
    ? (<Image style={props._style.imgOutfitContainer} source={{uri: props.post.shoesImg}} resizeMode={Image.resizeMode.contain}/>) : null}
  </View>
);

export default PostImage;
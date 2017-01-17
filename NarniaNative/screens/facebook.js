import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
//   AccessToken
// } = FBSDK;

// var Login = React.createClass({
export default class Facebook extends Component {
  render() {
    return (
      <View>
        <Text>HEY</Text>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
                console.warn(error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString());
                    console.warn(data);
                  }
                );
              }
            }
          }
          onLogoutFinished={() => console.warn('logout.')}/>
      </View>
    );
  }
}
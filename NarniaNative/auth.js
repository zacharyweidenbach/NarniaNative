import {
  Navigator, Alert, AsyncStorage,
} from 'react-native';

module.exports = {
  setToken: async function(token) {
    if (token) {
      try {
        await AsyncStorage.setItem('@Sessiontoken:token', token);
      } catch (error) {
        console.error(error, 'SET TOKEN ERROR');
      }
    } else {
      console.warn('setToken requires a token as an argument');
    }
  },

  getToken: async function() {
    try { // returns boolean for whether or not they are logged in;
      const value = await AsyncStorage.getItem('@Sessiontoken:token');
      if (value !== null) {
        return value;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error, 'GET TOKEN ERROR');
      return null;
    }
  },

  destroySession: async function() {
    try {
      await AsyncStorage.removeItem('@Sessiontoken:token');
      console.log('SESSION DESTROYED')
    } catch (error) {
      console.log(error, 'ERROR DESTROYING SESSION');
    }
  }
}
import Exponent, { Asset, Components } from 'exponent';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import DrawerNavigationScreen from './screens/DrawerNavigationScreen';
import LoginScreen from './screens/LoginScreen';
import AboutScreen from './screens/AboutScreen';
import SlidingTabScreen from './screens/SlidingTabScreen';

import {
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

const assets = [
];

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in LoginScreen below
  */
export const Router = createRouter(() => ({
  LoginScreen: () => LoginScreen,
  AboutScreen: () => AboutScreen,
  SlidingTabScreen: () => SlidingTabScreen,
}));

class App extends Component {

  state = {
    bootstrapped: false,
  };

  componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    const promises = assets.map(module => Asset.fromModule(module).downloadAsync());
    await Promise.all(promises);
    this.setState({
      bootstrapped: true,
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Components.AppLoading />;
    }

    /**
      * NavigationProvider is only needed at the top level of the app,
      * similar to react-redux's Provider component. It passes down
      * navigation objects and functions through context to children.
      *
      * StackNavigation represents a single stack of screens, you can
      * think of a stack like a stack of playing cards, and each time
      * you add a screen it slides in on top. Stacks can contain
      * other stacks, for example if you have a tab bar, each of the
      * tabs has its own individual stack. This is where the playing
      * card analogy falls apart, but it's still useful when thinking
      * of individual stacks.
      */
    return (
      <NavigationProvider router={Router}>
        <StatusBar barStyle="light-content" />
        <DrawerNavigationScreen />
      </NavigationProvider>
    );
  }
}

Exponent.registerRootComponent(App);
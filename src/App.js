import React from 'react';
import 'react-native-gesture-handler';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/Home';
import Detail from './screens/Detail';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Detail: { screen: Detail }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

function App() {
  return <AppContainer />;
}

export default App;

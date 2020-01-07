import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';

import { createAppContainer, withOrientation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/Home';
import Detail from './screens/Detail';
import MapScreen from './screens/MapScreen';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Detail: { screen: Detail },
    Map: { screen: MapScreen }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.takeSpace}>
        <Text style={styles.text}>Just taking up space</Text>
      </View>
      <AppContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  takeSpace: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blueviolet'
  },
  text: {
    color: 'white',
    fontSize: 20
  }
});

export default App;

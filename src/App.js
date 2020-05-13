import React from 'react';
import { View, StyleSheet } from 'react-native';

// packages
import 'react-native-gesture-handler';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import Home from 'screens/Home';
import Detail from 'screens/Detail';
import MapScreen from 'screens/MapScreen';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

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
      <AppContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  }
});

export default App;

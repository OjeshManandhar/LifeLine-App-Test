import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './screens/Home';
import Detail from './screens/Detail';

function RightButton() {
  return <Button onPress={() => alert('This is a button!')} title='Info' />;
}

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.takeSpace}>
        <Text style={styles.text}>Just taking up space</Text>
      </View>
      <Router>
        <Stack key='root'>
          <Scene key='home' component={Home} title='Home' hideNavBar={true} />
          <Scene
            key='detail'
            component={Detail}
            title='Detail'
            // for back button
            navBarButtonColor='white'
            // for title text
            titleStyle={styles.headerTitleStyle}
            // right button
            renderRightButton={RightButton}
            // for header background
            navigationBarStyle={styles.headerStyle}
          />
        </Stack>
      </Router>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  takeSpace: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blueviolet'
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  headerTitleStyle: {
    color: 'white'
  },
  headerStyle: {
    backgroundColor: 'blueviolet'
  }
});

export default App;

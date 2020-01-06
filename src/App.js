import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './screens/Home';
import Detail from './screens/Detail';

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.takeSpace}>
        <Text style={styles.text}>Just taking up space</Text>
      </View>
      <Router>
        <Stack key='root'>
          <Scene key='home' component={Home} title='Home' hideNavBar={true} />
          <Scene key='detail' component={Detail} title='Detail' />
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
  }
});

export default App;

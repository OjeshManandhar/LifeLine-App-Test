import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './screens/Home';
import Detail from './screens/Detail';

function App() {
  return (
    <Router>
      <Stack key='root'>
        <Scene key='home' component={Home} title='Home' />
        <Scene key='detail' component={Detail} title='Detail' />
      </Stack>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20
  }
});

export default App;

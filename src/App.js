import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import 'react-native-gesture-handler';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello World!</Text>
    </View>
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

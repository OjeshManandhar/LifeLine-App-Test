import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
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

export default Home;

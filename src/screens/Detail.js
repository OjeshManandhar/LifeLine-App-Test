import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Detail() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Detail Screen</Text>
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

export default Detail;

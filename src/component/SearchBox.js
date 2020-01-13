import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function SearchBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search for location here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});

export default SearchBox;

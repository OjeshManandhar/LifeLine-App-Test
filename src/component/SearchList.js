import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SearchList() {
  return (
    <View style={styles.container}>
      <Text>SearchList</Text>
      <Text>SearchList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});

export default SearchList;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SearchResult({ data }) {
  console.log('data:', data);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.coordinate}>
        {data.latitude}, {data.longitude}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: '#ededed',
    borderRadius: 5,
    backgroundColor: '#eeeeee'
  },
  name: {
    fontSize: 20
  },
  coordinate: {
    fontSize: 10
  }
});

export default SearchResult;

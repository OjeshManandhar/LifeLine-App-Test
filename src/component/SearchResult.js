import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SearchResult({ data, last }) {
  return (
    <View style={[styles.container, { borderBottomWidth: last ? 0 : 1 }]}>
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
    borderColor: '#cccccc'
  },
  name: {
    fontSize: 18
  },
  coordinate: {
    fontSize: 12
  }
});

export default SearchResult;

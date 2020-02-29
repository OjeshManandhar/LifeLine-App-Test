import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

function SearchResult({ data, last, setDestination }) {
  return (
    <TouchableNativeFeedback onPress={() => setDestination(data)}>
      <View style={[styles.container, { borderBottomWidth: last ? 0 : 1 }]}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.location}>{data.location}</Text>
        <Text style={styles.coordinate}>
          {data.coordinate.lat.toFixed(2)}, {data.coordinate.long.toFixed(2)}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#dddddd'
  },
  name: {
    fontSize: 18
  },
  location: {
    fontSize: 15
  },
  coordinate: {
    fontSize: 12
  }
});

export default SearchResult;

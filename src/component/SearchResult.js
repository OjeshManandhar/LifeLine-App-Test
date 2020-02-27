import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

function SearchResult({ data, last, setDestination }) {
  return (
    <TouchableNativeFeedback onPress={() => setDestination(data)}>
      <View style={[styles.container, { borderBottomWidth: last ? 0 : 1 }]}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.coordinate}>
          {data.latitude}, {data.longitude}
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
  coordinate: {
    fontSize: 12
  }
});

export default SearchResult;

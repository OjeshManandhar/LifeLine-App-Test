import React from 'react';
import { View, Text, StylesSheet } from 'react-native';

function SearchResult(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.coordinate}>
        {props.latitude}, {props.longitude}
      </Text>
    </View>
  );
}

const styles = StylesSheet.create({
  container: {
    padding: 10,
    border: 2,
    borderColor: 'black'
  },
  name: {
    fontSize: 20
  },
  coordinate: {
    fontSize: 10
  }
});

export default SearchResult;

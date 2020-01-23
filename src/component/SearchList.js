import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SearchList(props) {
  console.log('keyword:', props.keyword);

  return (
    <View style={styles.container}>
      <Text>SearchList</Text>
      <Text>keyword => {props.keyword}</Text>
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

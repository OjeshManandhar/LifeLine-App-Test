import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// global
import ZIndex from 'global/zIndex';

function SearchList(props) {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Text>SearchList</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: ZIndex.searchList,

    backgroundColor: '#e5e5e5',

    padding: 2,
    paddingTop: 60
  }
});

export default SearchList;

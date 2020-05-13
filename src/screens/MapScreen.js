import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Map from 'component/Map';

// utils
import zIndex from 'utils/zIndex';

function MapScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text>SearchBox</Text>
      </View>

      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: '5%',
    right: '5%',
    height: 50,
    borderWidth: 2,
    zIndex: zIndex.searchBox
  }
});

export default MapScreen;

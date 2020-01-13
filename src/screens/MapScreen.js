import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Map from './../component/Map';

function MapScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <Text style={styles.text}>Search for location here</Text>
      </View>
      <Map userInfo={props.navigation.getParam('userInfo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  searchArea: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default MapScreen;

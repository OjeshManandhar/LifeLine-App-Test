import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Map from './../component/Map';

function MapScreen(props) {
  return (
    <View style={styles.container}>
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
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default MapScreen;

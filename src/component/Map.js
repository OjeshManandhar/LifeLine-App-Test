import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

function Map(props) {
  console.log('userInfo:', JSON.parse(props.userInfo));

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Street}
      ></MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Map;

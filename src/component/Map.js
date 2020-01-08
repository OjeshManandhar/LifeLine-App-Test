import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

function Map(props) {
  console.log('userInfo:', JSON.parse(props.userInfo));

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        // A size must be provided to the MapboxGL.MapView through styles
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Outdoors}
      >
        <MapboxGL.UserLocation visible />

        <MapboxGL.Camera
          zoomLevel={14}
          followUserLocation
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
        />
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Map;

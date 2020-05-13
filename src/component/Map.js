import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

function Map() {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        // A size must be provided to the MapboxGL.MapView through style prop
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Outdoors}
      >
        <MapboxGL.UserLocation visible />

        <MapboxGL.Camera
          zoomLevel={14}
          followUserLocation={true}
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          animationDuration={3000}
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

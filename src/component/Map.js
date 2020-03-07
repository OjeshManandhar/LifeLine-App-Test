import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

function Map({ userInfo, destination, ...props }) {
  const mapRef = React.createRef();

  const [pickedCoordinate, setPickedCoordinate] = useState(null);

  function handlePress(event) {
    const pointInView = event.geometry.coordinates;

    setPickedCoordinate(pointInView);
    props.setPickedLocation(pointInView);
  }

  function renderDestination() {
    return (
      <MapboxGL.PointAnnotation
        key={destination.id}
        id={destination.id}
        coordinate={destination.coordinate}
        title={destination.name}
      >
        <MapboxGL.Callout
          title={`${destination.name}\n${destination.location}`}
        />
      </MapboxGL.PointAnnotation>
    );
  }

  function renderPickedLocation() {
    return (
      <MapboxGL.PointAnnotation
        id='pickedLocation'
        coordinate={pickedCoordinate}
      >
        <MapboxGL.Callout title='Picked destination' />
      </MapboxGL.PointAnnotation>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapRef}
        // A size must be provided to the MapboxGL.MapView through style prop
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Outdoors}
        onPress={event => props.mapStatus === 'picking' && handlePress(event)}
      >
        <MapboxGL.UserLocation visible />

        <MapboxGL.Camera
          zoomLevel={14}
          followUserLocation={!destination}
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          animationMode={'flyTo'}
          animationDuration={6000}
          centerCoordinate={destination && destination.coordinate}
        />

        {destination && renderDestination()}

        {pickedCoordinate != null && renderPickedLocation()}
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

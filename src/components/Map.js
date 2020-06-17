import React, { useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  KeyboardAvoidingView
} from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// global
import ZIndex from 'global/zIndex';
import { MapScreenStatus } from 'global/enum';

function Map({ destination, screenStatus }) {
  async function askGPSPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App GPS Permission',
          message:
            'App needs access to your location (GPS & Internet) ' +
            'so we can pin-point your exact location.',
          buttonNegative: 'No, thanks',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('FINE LOCATION Access Granted');
      } else {
        console.log('FINE LOCATION Access Denied');
      }
    } catch (err) {
      console.warn('FINE ACCESS Permission error:', err);
    }
  }

  // For Permission
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(result => {
      if (!result) {
        askGPSPermissions();
      }
    });
  }, []);

  const renderDestination = useCallback(() => {
    let title = destination.name;
    if (destination.location) {
      title += '\n\n' + destination.location;
    }

    return (
      <MapboxGL.PointAnnotation
        key={destination.id}
        id={destination.id}
        coordinate={destination.coordinate}
        title={destination.name}
        snippet={destination.location}
      >
        <MapboxGL.Callout title={title} />
        {/* <View>
            <Text style={{ fontSize: 17 }}>{destination.name}</Text>
            <Text style={{ fontSize: 10 }}>{destination.location}</Text>
          </View>
        </MapboxGL.Callout> */}
      </MapboxGL.PointAnnotation>
    );
  }, [destination]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <MapboxGL.MapView
        // A size must be provided to the MapboxGL.MapView through style prop
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Outdoors}
        compassViewMargins={{ x: 10, y: 90 }}
      >
        <MapboxGL.UserLocation visible />

        <MapboxGL.Camera
          zoomLevel={14}
          followUserLocation={screenStatus === MapScreenStatus.mapView}
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          animationMode={'flyTo'}
          animationDuration={1500}
          centerCoordinate={
            screenStatus === MapScreenStatus.showDestination
              ? destination && destination.coordinate
              : null
          }
        />

        {destination && renderDestination()}
      </MapboxGL.MapView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: ZIndex.map
  }
});

export default Map;

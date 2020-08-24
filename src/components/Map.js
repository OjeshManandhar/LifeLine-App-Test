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
import ZIndex, { LayerIndex } from 'global/zIndex';
import { MapScreenStatus } from 'global/enum';

function Map({
  destination,
  screenStatus,
  startLocation,
  pickedLocation,
  routeToDestination,
  routesToPickedLocation,
  selectedRouteToPickedLocation,
  setSelectedRouteToPickedLocation
}) {
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

  const renderStartLocationMarker = useCallback(() => {
    return (
      <MapboxGL.PointAnnotation
        key={new Date().getTime()}
        id={new Date().getTime().toString()}
        coordinate={startLocation}
        title='Start Location'
        snippet='Your start location'
      >
        <MapboxGL.Callout title='Start location' />
      </MapboxGL.PointAnnotation>
    );
  }, [startLocation]);

  const renderDestinationMarker = useCallback(() => {
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
      </MapboxGL.PointAnnotation>
    );
  }, [destination]);

  const renderRouteToDestination = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='routeToDestination-Source'
        shape={routeToDestination.route}
      >
        <MapboxGL.LineLayer
          layerIndex={routeToDestination.id + LayerIndex.routeToDestination}
          id='routeToDestination-Layer'
          sourceID='routeToDestination-Source'
          style={layerStyles.routeToDestination}
        />
      </MapboxGL.ShapeSource>
    );
  });

  const renderPickedLocation = useCallback(() => {
    let title = pickedLocation.name;
    if (pickedLocation.location) {
      title += '\n\n' + pickedLocation.location;
    }

    return (
      <MapboxGL.PointAnnotation
        key={pickedLocation.id}
        id={pickedLocation.id}
        coordinate={pickedLocation.coordinate}
        title={pickedLocation.name}
        snippet={pickedLocation.location}
      >
        <MapboxGL.Callout title={title} />
        {/* <View>
            <Text style={{ fontSize: 17 }}>{pickedLocation.name}</Text>
            <Text style={{ fontSize: 10 }}>{pickedLocation.location}</Text>
          </View>
        </MapboxGL.Callout> */}
      </MapboxGL.PointAnnotation>
    );
  }, [pickedLocation]);

  const renderRoutesToPickedLocation = useCallback(() => {
    const routes = routesToPickedLocation.map(route => {
      const selected = route.id === selectedRouteToPickedLocation;
      const id = selected
        ? 'selectedRouteToPickedlocation-Source'
        : `routeToPickedLocation${route.id}-Source`;

      return (
        <MapboxGL.ShapeSource
          key={route.id}
          id={id}
          shape={route.route}
          onPress={() => {
            route.id !== selectedRouteToPickedLocation &&
              setSelectedRouteToPickedLocation(route.id);
          }}
        >
          <MapboxGL.LineLayer
            id={
              selected
                ? 'selectedRouteToPickedLocation-Layer'
                : `routeToPickedLocation${route.id}-Layer`
            }
            layerIndex={
              selected
                ? route.id + LayerIndex.selectedRouteToPickedLocation
                : route.id + LayerIndex.routeToPickedLocation
            }
            sourceID={id}
            style={
              selected
                ? layerStyles.selectedRouteToPickedLocation
                : layerStyles.routesToPickedLocation
            }
          />
        </MapboxGL.ShapeSource>
      );
    });

    return routes;
  }, [routesToPickedLocation, selectedRouteToPickedLocation]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <MapboxGL.MapView
        // A size must be provided to the MapboxGL.MapView through style prop
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Outdoors}
        compassViewMargins={{ x: 10, y: 90 }}
      >
        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        <MapboxGL.Camera
          zoomLevel={14}
          followUserLocation={screenStatus === MapScreenStatus.mapView}
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          animationMode={'flyTo'}
          animationDuration={1500}
          centerCoordinate={
            screenStatus === MapScreenStatus.showDestinationInfo
              ? pickedLocation && pickedLocation.coordinate
              : null
          }
        />

        {screenStatus === MapScreenStatus.showPickedLocation &&
          pickedLocation &&
          renderPickedLocation()}

        {screenStatus === MapScreenStatus.showPickedLocation &&
          routesToPickedLocation &&
          renderRoutesToPickedLocation()}

        {screenStatus === MapScreenStatus.usingRoute &&
          renderStartLocationMarker()}

        {screenStatus === MapScreenStatus.usingRoute &&
          destination &&
          renderDestinationMarker()}

        {screenStatus === MapScreenStatus.usingRoute &&
          routeToDestination &&
          renderRouteToDestination()}
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

const layerStyles = {
  routeToDestination: {
    lineWidth: 5,
    lineOpacity: 1,
    lineColor: '#669df6',
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round
  },
  routesToPickedLocation: {
    lineWidth: 5,
    lineOpacity: 1,
    lineColor: '#bbbdbf',
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round
  },
  selectedRouteToPickedLocation: {
    lineWidth: 5,
    lineOpacity: 1,
    lineColor: '#5fb671',
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round
  }
};

export default Map;

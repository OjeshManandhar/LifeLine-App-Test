import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  KeyboardAvoidingView
} from 'react-native';

// packages
import { point } from '@turf/helpers';
import MapboxGL from '@react-native-mapbox-gl/maps';

// global
import ZIndex, { LayerIndex } from 'global/zIndex';
import { MapStatus, MapScreenStatus } from 'global/enum';

// utils
import UserLocation from 'utils/userLocation';

// assets
import startMarker from 'assets/images/startMarker.png';
import destinationMarker from 'assets/images/destinationMarker.png';
import pickedLocationMarker from 'assets/images/pickedLocationMarker.png';

function Map({
  mapStatus,
  destination,
  startLocation,
  pickedLocation,
  mapScreenStatus,
  setMapScreenStatus,
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

  function toggleMapScreenStatus() {
    if (mapScreenStatus === MapScreenStatus.mapView) {
      setMapScreenStatus(MapScreenStatus.showRouteInfo);
    } else if (mapScreenStatus === MapScreenStatus.showRouteInfo) {
      setMapScreenStatus(MapScreenStatus.mapView);
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
      <MapboxGL.ShapeSource
        id='startLocationMarker-Source'
        shape={point(startLocation)}
        onPress={toggleMapScreenStatus}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.startLocationMarker}
          id='startLocationMarker-Layer'
          sourceID='startLocationMarker-Source'
          layerIndex={LayerIndex.startLocationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [startLocation]);

  const renderDestinationMarker = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='destinationMarker-Source'
        shape={point(destination.coordinate)}
        onPress={toggleMapScreenStatus}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.destinationMarker}
          id='destinationMarker-Layer'
          sourceID='destinationMarker-Source'
          layerIndex={LayerIndex.destinationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [destination]);

  const renderRouteToDestination = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='routeToDestination-Source'
        shape={routeToDestination.route}
        onPress={toggleMapScreenStatus}
      >
        <MapboxGL.LineLayer
          layerIndex={routeToDestination.id + LayerIndex.routeToDestination}
          id='routeToDestination-Layer'
          sourceID='routeToDestination-Source'
          style={layerStyles.routeToDestination}
        />
      </MapboxGL.ShapeSource>
    );
  }, [routeToDestination]);

  const renderPickedLocation = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='pickedLocationMarker-Source'
        shape={point(pickedLocation.coordinate)}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.pickedLocationMarker}
          id='pickedLocationMarker-Layer'
          sourceID='pickedLocationMarker-Source'
          layerIndex={LayerIndex.pickedLocationMarker}
        />
      </MapboxGL.ShapeSource>
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
          followUserLocation={mapStatus === MapStatus.routToDestination}
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          followZoomLevel={15}
          animationMode={'easeTo'}
          animationDuration={1.5 * 1000}
          centerCoordinate={
            mapStatus === MapStatus.routesToPickedLocation
              ? pickedLocation && pickedLocation.coordinate
              : UserLocation.currentLocation
          }
        />

        <MapboxGL.Images
          images={{
            startMarker: startMarker,
            destinationMarker: destinationMarker,
            pickedLocationMarker: pickedLocationMarker
          }}
        />

        {mapScreenStatus === MapScreenStatus.showRouteInfo &&
          mapStatus === MapStatus.routesToPickedLocation &&
          pickedLocation &&
          renderPickedLocation()}

        {mapScreenStatus === MapScreenStatus.showRouteInfo &&
          mapStatus === MapStatus.routesToPickedLocation &&
          routesToPickedLocation &&
          renderRoutesToPickedLocation()}

        {mapScreenStatus === MapScreenStatus.showRouteInfo &&
          mapStatus === MapStatus.routeToDestination &&
          renderStartLocationMarker()}

        {(mapScreenStatus === MapScreenStatus.mapView ||
          mapScreenStatus === MapScreenStatus.showRouteInfo) &&
          mapStatus === MapStatus.routeToDestination &&
          destination &&
          renderDestinationMarker()}

        {(mapScreenStatus === MapScreenStatus.mapView ||
          mapScreenStatus === MapScreenStatus.showRouteInfo) &&
          mapStatus === MapStatus.routeToDestination &&
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
  startLocationMarker: {
    iconSize: 0.035,
    iconAllowOverlap: true,
    iconImage: 'startMarker'
  },
  destinationMarker: {
    iconSize: 0.075,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'destinationMarker'
  },
  pickedLocationMarker: {
    iconSize: 0.065,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'pickedLocationMarker'
  },
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

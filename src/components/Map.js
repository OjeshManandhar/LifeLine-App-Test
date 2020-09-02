import React, { useRef, useEffect, useCallback } from 'react';
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
  pickedCoordinate,
  setMapScreenStatus,
  routeToDestination,
  setPickedCoordintate,
  routesToPickedLocation,
  selectedRouteToPickedLocation,
  setSelectedRouteToPickedLocation
}) {
  const cameraRef = useRef(null);

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

  const renderPickMarker = useCallback(() => {
    if (!pickedCoordinate) return null;

    return (
      <MapboxGL.PointAnnotation
        id='user-picked-location'
        title='Picked Destination'
        coordinate={pickedCoordinate}
        draggable={true}
        onDragEnd={data => setPickedCoordintate(data.geometry.coordinates)}
      />
    );
  }, [pickedCoordinate, setPickedCoordintate]);

  const toggleMapScreenStatus = useCallback(() => {
    if (mapScreenStatus === MapScreenStatus.mapView) {
      setMapScreenStatus(MapScreenStatus.showRouteInfo);
    } else if (mapScreenStatus === MapScreenStatus.showRouteInfo) {
      setMapScreenStatus(MapScreenStatus.mapView);
    }
  }, [mapScreenStatus, setMapScreenStatus]);

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
  }, [startLocation, toggleMapScreenStatus]);

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
  }, [destination, toggleMapScreenStatus]);

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
  }, [routeToDestination, toggleMapScreenStatus]);

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

  const getBounds = useCallback(() => {
    if (!routesToPickedLocation) return null;

    const longitudes = [],
      latitudes = [];

    routesToPickedLocation.forEach(route => {
      route.route.geometry.coordinates.forEach(coordinate => {
        longitudes.push(coordinate[0]);
        latitudes.push(coordinate[1]);
      });
    });

    const north = Math.max(...longitudes),
      south = Math.min(...longitudes),
      east = Math.max(...latitudes),
      west = Math.min(...latitudes);

    // for arguments to MapboxGl.Camera
    // return {
    //   ne: [north, east],
    //   sw: [south, west],
    //   // paddingTop: 10,
    //   // paddingLeft: 10,
    //   // paddingBottom: 10,
    //   // paddingRight: 10,
    //   animationDuration: 1.5 * 1000
    // };

    // for MapboxGl.Camera.fitBounds
    return [[north, east], [south, west], 0, 1.5 * 1000];
  }, [routesToPickedLocation]);

  const updateCamera = useCallback(() => {
    const cam = cameraRef.current;

    if (!cam) return null;

    if (mapStatus === MapStatus.routesToPickedLocation && getBounds()) {
      cam.fitBounds(...getBounds());
    } else {
      cam.setCamera({
        centerCoordinate: UserLocation.currentLocation
      });
    }
  }, [cameraRef.current, mapStatus, getBounds]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <MapboxGL.MapView
        // A size must be provided to the MapboxGL.MapView through style prop
        style={styles.container}
        styleURL={MapboxGL.StyleURL.Outdoors}
        compassViewMargins={{ x: 10, y: 90 }}
        onPress={
          mapStatus === MapStatus.pickingLocation &&
          mapScreenStatus === MapScreenStatus.picking
            ? data => setPickedCoordintate(data.geometry.coordinates)
            : undefined
        }
      >
        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        <MapboxGL.Camera
          ref={cameraRef}
          animationMode={'easeTo'}
          animationDuration={1.5 * 1000}
          followUserLocation={mapStatus !== MapStatus.routesToPickedLocation}
          followUserMode={
            mapStatus === MapStatus.routeToDestination
              ? MapboxGL.UserTrackingModes.FollowWithHeading
              : MapboxGL.UserTrackingModes.FollowWithCourse
          }
          followZoomLevel={mapStatus === MapStatus.routeToDestination ? 15 : 14}
          // {...(() => {
          //   if (
          //     routesToPickedLocation &&
          //     mapStatus === MapStatus.routesToPickedLocation &&
          //     getBounds()
          //   )
          //     return {
          //       bounds: getBounds()
          //     };
          // })()}

          // bounds={
          //   routesToPickedLocation &&
          //   mapStatus === MapStatus.routesToPickedLocation
          //     ? getBounds()
          //     : undefined
          // }
        />

        <MapboxGL.Images
          images={{
            startMarker: startMarker,
            destinationMarker: destinationMarker,
            pickedLocationMarker: pickedLocationMarker
          }}
        />

        {cameraRef.current && updateCamera()}

        {mapScreenStatus === MapScreenStatus.picking &&
          mapStatus === MapStatus.pickingLocation &&
          pickedCoordinate &&
          renderPickMarker()}

        {mapScreenStatus === MapScreenStatus.showRouteInfo &&
          mapStatus === MapStatus.routesToPickedLocation &&
          pickedLocation &&
          renderPickedLocation()}

        {mapScreenStatus === MapScreenStatus.showRouteInfo &&
          mapStatus === MapStatus.routesToPickedLocation &&
          routesToPickedLocation &&
          renderRoutesToPickedLocation()}

        {mapStatus === MapStatus.routeToDestination &&
          startLocation &&
          renderStartLocationMarker()}

        {mapStatus === MapStatus.routeToDestination &&
          destination &&
          renderDestinationMarker()}

        {mapStatus === MapStatus.routeToDestination &&
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
    iconSize: 0.04,
    iconAllowOverlap: true,
    iconImage: 'startMarker'
  },
  destinationMarker: {
    iconSize: 0.08,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'destinationMarker'
  },
  pickedLocationMarker: {
    iconSize: 0.07,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'pickedLocationMarker'
  },
  routeToDestination: {
    lineWidth: 6,
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

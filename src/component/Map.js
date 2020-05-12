import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// packages
import polyline from '@mapbox/polyline';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString as makeLineString } from '@turf/helpers';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const mbxDirection = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirection({ accessToken: MAPBOX_API_KEY });

function Map({ userInfo, destination, ...props }) {
  const mapRef = React.createRef();

  const [route, setRoute] = useState(null);
  const [pickedCoordinate, setPickedCoordinate] = useState(null);

  const layerStyles = {
    route: {
      lineColor: '#314ccd',
      lineCap: MapboxGL.LineJoin.Round,
      lineWidth: 5,
      lineOpacity: 0.84
    }
  };

  function handlePress(event) {
    const pointInView = event.geometry.coordinates;

    setPickedCoordinate(pointInView);
    props.setPickedLocation(pointInView);
  }

  function renderDestination() {
    let title = destination.name;
    if (destination.location) {
      title += '\n' + destination.location;
    }

    return (
      <MapboxGL.PointAnnotation
        key={destination.id}
        id={destination.id}
        coordinate={destination.coordinate}
        title={destination.name}
      >
        <MapboxGL.Callout title={title} />
      </MapboxGL.PointAnnotation>
    );
  }

  function renderPickedLocation() {
    return (
      <MapboxGL.PointAnnotation
        id='currentlyPickedLocation'
        coordinate={pickedCoordinate}
      >
        <MapboxGL.Callout title='Picked destination' />
      </MapboxGL.PointAnnotation>
    );
  }

  function renderRoute() {
    console.log('renderRoute:', route);

    return (
      <MapboxGL.ShapeSource id='routeSource' shape={route}>
        <MapboxGL.LineLayer id='routeFill' style={layerStyles.route} />
      </MapboxGL.ShapeSource>
    );
  }

  useEffect(() => {
    if (destination) {
      setPickedCoordinate(null);
    }

    if (
      props.mapStatus !== 'picking' &&
      props.startLocation != [] &&
      destination
    ) {
      console.log('startLocation:', props.startLocation);
      console.log('destination:', destination.coordinate);

      directionsClient
        .getDirections({
          waypoints: [
            { coordinates: props.startLocation },
            { coordinates: destination.coordinate }
          ],
          profile: 'driving-traffic',
          geometries: 'geojson'
          // geometries: 'polyline6'
        })
        .send()
        .then(
          response => {
            setRoute(
              makeLineString(
                response.body.routes[0].geometry.coordinates
                // polyline.decode(response.body.routes[0].geometry, 6)
                // polyline.toGeoJSON(response.body.routes[0].geometry, 6)
              )
            );
          },
          error => {
            console.log('direction error:', error.body);
          }
        );
    }
  }, [props.startLocation, destination]);

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
          animationMode={props.mapStatus === 'picking' ? null : 'flyTo'}
          animationDuration={3000}
          centerCoordinate={destination && destination.coordinate}
        />

        {destination && renderDestination()}

        {route && renderRoute()}

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

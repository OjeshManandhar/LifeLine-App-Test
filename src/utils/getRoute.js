// packages
// import polyline from '@mapbox/polyline';
import { lineString as makeLineString } from '@turf/helpers';
const mbxDirection = require('@mapbox/mapbox-sdk/services/directions');

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

// utils
import UserLocation from 'utils/userLocation';

const directionsClient = mbxDirection({ accessToken: MAPBOX_API_KEY });

function makeRoutesList(routes) {
  // console.log('makeRoutesList argument:', routes);
  // console.log(
  //   'makeRoutesList result:',
  //   routes.map(route => {
  //     return {
  //       weight: route.weight,
  //       distance: route.distance || null /* meters */,
  //       duration: route.duration || null /* seconds */,
  //       route: makeLineString(route.geometry.coordinates)
  //     };
  //   })
  // );

  return routes.map(route => {
    return {
      weight: route.weight,
      distance: route.distance || null /* meters */,
      duration: route.duration || null /* seconds */,
      route: makeLineString(route.geometry.coordinates)
    };
  });
}

function getRoute(destination) {
  return new Promise((resolve, reject) => {
    directionsClient
      .getDirections({
        waypoints: [
          { coordinates: UserLocation.currentLocation },
          { coordinates: destination }
        ],
        // overview: 'full',
        geometries: 'geojson',
        // geometries: 'polyline6',
        profile: 'driving-traffic',
        annotations: ['speed', 'distance', 'duration']
      })
      .send()
      .then(
        response => {
          resolve(makeRoutesList(response.body.routes));
        },
        error => {
          console.log('getRoute error:', error);
          reject(error);
        }
      );
  });
}

export default getRoute;

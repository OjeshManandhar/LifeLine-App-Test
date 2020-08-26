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
  let id = 1;

  const routesList = routes.map(route => {
    return {
      id: id++,
      weight: route.weight,
      distance: route.distance || null /* meters */,
      duration: route.duration || null /* seconds */,
      route: makeLineString(route.geometry.coordinates)
    };
  });

  routesList.sort((routeA, routeB) => {
    if (routeA.weight === routeB.weight) {
      if (routeA.duration === routeB.duration) {
        if (routeA.distance === routeB.distance) {
          return 0;
        } else {
          return routeA.distance - routeB.distance;
        }
      } else {
        return routeA.duration - routeB.duration;
      }
    } else {
      return routeA.weight - routeB.weight;
    }
  });

  return routesList;
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
        alternatives: true /* maximum 2 alternatives i.e. total 3 routes */,
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

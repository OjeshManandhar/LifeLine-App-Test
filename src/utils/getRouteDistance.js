// packages
const mbxDirection = require('@mapbox/mapbox-sdk/services/directions');

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const directionsClient = mbxDirection({ accessToken: MAPBOX_API_KEY });

function getRouteDistance(startLocation, destination) {
  return new Promise((resolve, reject) => {
    directionsClient
      .getDirections({
        waypoints: [
          { coordinates: startLocation },
          { coordinates: destination.center }
        ],
        geometries: 'geojson',
        profile: 'driving-traffic',
        annotations: ['distance']
      })
      .send()
      .then(
        response => {
          resolve(response.body.routes[0].distance / 1000);
        },
        error => {
          console.log('Direction error:', error);
          reject(error);
        }
      );
  });
}

export default getRouteDistance;

// packages
import { getDistance } from 'geolib';
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');

// utils
import UserLocation from 'utils/userLocation';
import getRouteDistance from 'utils/getRouteDistance';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function reverseGeocoder(coordinates) {
  return new Promise((resolve, reject) => {
    geocodingClient
      .reverseGeocoder({
        query: coordinates,
        countries: ['np'],
        limit: 1,
        types: [
          'poi',
          'place',
          'region',
          'address',
          'district',
          'locality',
          'poi.landmark',
          'neighborhood'
        ]
      })
      .send()
      .then(
        response => {
          console.log('reverseGeocoder response:', response);

          resolve(response);
        },
        error => {
          console.log('reverseGeocoder error:', error);

          reject(error);
        }
      );
  });
}

export default reverseGeocoder;

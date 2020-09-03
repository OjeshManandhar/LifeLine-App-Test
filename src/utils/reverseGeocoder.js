// packages
import { getDistance } from 'geolib';
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');

// utils
import UserLocation from 'utils/userLocation';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function parseResponse(coordinate, feature) {
  const startLocation = UserLocation.currentLocation;

  return {
    id: feature.id,
    name: feature.text,
    coordinate: coordinate,
    type: feature.place_type[0],
    location: feature.place_name,
    distance: getDistance(
      { latitude: startLocation[1], longitude: startLocation[0] },
      { latitude: feature.center[1], longitude: feature.center[0] },
      10
    )
  };
}

function reverseGeocoder(coordinate) {
  return new Promise((resolve, reject) => {
    geocodingClient
      .reverseGeocode({
        query: coordinate,
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
          resolve(parseResponse(coordinate, response.body.features[0]));
        },
        error => {
          console.log('reverseGeocoder error:', error);

          reject(error);
        }
      );
  });
}

export default reverseGeocoder;

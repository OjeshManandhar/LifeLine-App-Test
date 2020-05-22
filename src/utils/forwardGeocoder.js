// packages
import Geolocation from '@react-native-community/geolocation';
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');

// utils
import getDistance from 'utils/getDistance';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function parseResponse(match) {
  const locations = [];
  const features = match.features;

  for (let key in features) {
    const data = {
      id: features[key].id,
      name: features[key].text,
      coordinate: features[key].center,
      location: features[key].place_name
    };

    Geolocation.getCurrentPosition(info => {
      const startLocation = [info.coords.longitude, info.coords.latitude];

      getDistance(startLocation, features[key])
        .then(({ distance, route }) => {
          console.log('route:', route);
          console.log('distance:', distance);

          data.distance = distance;

          console.log('data:', data);

          locations.push(data);
        })
        .catch(error => {
          console.log('direction error in forwardGeocoder:', error);
        });
    });
  }

  return locations;
}

function forwardGeocoder(keyword) {
  return new Promise((resolve, reject) => {
    geocodingClient
      .forwardGeocode({
        query: keyword,
        countries: ['np']
      })
      .send()
      .then(
        response => {
          const match = response.body;
          resolve(parseResponse(match));
        },
        error => {
          console.log('error:', error);
          // if (err.type === 'RequestAbortedError') {
          //   console.log('Request Aborted');
          //   return;
          // }
          // console.error(error.message);

          // const match = error.body;
          reject(error);
        }
      );
  });
}

export default forwardGeocoder;

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');
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

    locations.push(data);
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
          const match = error.body;
          reject(match);
        }
      );
  });
}

export default forwardGeocoder;

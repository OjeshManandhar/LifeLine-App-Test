// packages
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');

// utils
import getRoute from 'utils/getRoute';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function parseResponse(match) {
  return new Promise((resolve, reject) => {
    const locations = [];
    const distancePromiseList = [];
    const features = match.features;

    Geolocation.getCurrentPosition(info => {
      const startLocation = [info.coords.longitude, info.coords.latitude];

      for (let key in features) {
        const data = {
          id: features[key].id,
          name: features[key].text,
          coordinate: features[key].center,
          location: features[key].place_name
          // distance: (await getRoute(startLocation, features[key])).distance
        };

        // Only store data of location within 500km
        const distance = getDistance(
          { latitude: startLocation[1], longitude: startLocation[0] },
          { latitude: data.coordinate[1], longitude: data.coordinate[0] },
          10
        );
        if (distance <= 500 * 1000) {
          locations.push(data);

          // Only find route if the location is within 50km
          if (distance <= 50 * 1000) {
            distancePromiseList.push(getRoute(startLocation, features[key]));
          }
        }
      }

      Promise.all(distancePromiseList).then(values => {
        for (let i = 0; i < values.length; i++) {
          locations[i].distance = parseFloat(values[i].distance).toFixed(2);
        }

        resolve(locations);
      });
    });
  });
}

function forwardGeocoder(keyword) {
  return new Promise((resolve, reject) => {
    geocodingClient
      .forwardGeocode({
        query: keyword,
        countries: ['np'],
        autocomplete: true
        // types: [
        //   'poi',
        //   'place',
        //   'region',
        //   'address',
        //   'district',
        //   'locality',
        //   'poi.landmark',
        //   'neighborhood'
        // ]
      })
      .send()
      .then(
        async response => {
          const match = response.body;

          resolve(await parseResponse(match));
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

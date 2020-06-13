// packages
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');

// utils
import getRouteDistance from 'utils/getRouteDistance';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function parseResponse(match) {
  return new Promise((resolve, reject) => {
    const locations = [];
    const distancePromiseList = [];
    const features = match.features;
    const distancePromiseListId = [];

    Geolocation.getCurrentPosition(info => {
      const startLocation = [info.coords.longitude, info.coords.latitude];

      for (let key in features) {
        const data = {
          id: features[key].id,
          name: features[key].text,
          coordinate: features[key].center,
          location: features[key].place_name
          // distance: (await getRouteDistance(startLocation, features[key])).distance
        };

        const distance = getDistance(
          { latitude: startLocation[1], longitude: startLocation[0] },
          { latitude: data.coordinate[1], longitude: data.coordinate[0] },
          10
        );

        // Only store data of location within 500km
        if (distance <= 500 * 1000) {
          locations.push(data);

          // Only find route if the location is within 50km
          if (distance <= 50 * 1000) {
            distancePromiseList.push(
              getRouteDistance(startLocation, features[key])
            );
            distancePromiseListId.push(data.id);
          }
        }
      }

      Promise.all(distancePromiseList).then(values => {
        for (let i = 0; i < values.length; i++) {
          for (let j = 0; j < locations.length; j++) {
            if (locations[j].id === distancePromiseListId[i]) {
              locations[j].distance = parseFloat(values[i]).toFixed(2);
            }
          }
        }

        locations.sort((locationA, locationB) => {
          const locA = locationA.distance;
          const locB = locationB.distance;

          if (!locA && !locB) {
            return 0;
          } else if (!locA) {
            // locB smaller than locA(undefined)
            return 1;
          } else if (!locB) {
            // locA smaller than locB(undefined)
            return -1;
          } else {
            return locA - locB;
          }
        });

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

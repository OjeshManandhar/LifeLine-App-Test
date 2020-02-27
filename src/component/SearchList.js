import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  BackHandler,
  Keyboard
} from 'react-native';

// components
import SearchResult from './SearchResult';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function parseResponse(response) {
  console.log('parseResponse');

  return JSON.stringify(response);
}

function geocoder(keyword, setResponse, setError) {
  geocodingClient
    .forwardGeocode({
      query: keyword,
      countries: ['np']
    })
    .send()
    .then(response => {
      const match = response.body;

      console.log('response:', response);
      console.log('typeof response:', typeof response);

      console.log('match:', match);
      console.log('typeof match:', typeof match);

      setResponse(JSON.stringify(match));
    }),
    error => {
      const match = error.body;

      console.log('error:', error);
      console.log('typeof error:', typeof error);

      console.log('match:', match);
      console.log('typeof match:', typeof match);

      setError(JSON.stringify(match));
    };
}

function SearchList(props) {
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([
    {
      name: 'Kathmandu',
      latitude: 1,
      longitude: 1
    },
    {
      name: 'Lalitpur',
      latitude: 2,
      longitude: 2
    },
    {
      name: 'Bhaktapur',
      latitude: 3,
      longitude: 4
    },
    {
      name: 'Kathmandu',
      latitude: 1,
      longitude: 1
    },
    {
      name: 'Lalitpur',
      latitude: 2,
      longitude: 2
    },
    {
      name: 'Bhaktapur',
      latitude: 3,
      longitude: 4
    }
  ]);
  const [response, setResponse] = useState('');

  // if (props.keyword !== '') {
  //   geocoder(props.keyword, setResponse, setError);
  // }

  function handleBackButton() {
    console.log('Back button handler');
    props.setIsSearching(false);
    // to blur the InutText
    Keyboard.dismiss();
    return true;
  }

  function renderSearchResults() {
    let last = false;
    const searchResult = [];

    for (let i = 0; i < locations.length; i++) {
      if (i === locations.length - 1) {
        last = true;
      }
      searchResult.push(
        <SearchResult
          key={i}
          data={locations[i]}
          last={last}
          setDestination={data => {
            props.setDestination(data);
            props.setIsSearching(false);
            Keyboard.dismiss();
          }}
        />
      );
    }

    return <View style={styles.searchResultGroup}>{searchResult}</View>;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Text>SearchList</Text>
        <Text>keyword => {props.keyword}</Text>
        <Text>response => {response}</Text>
        <Text>error => {error}</Text>

        {renderSearchResults(locations)}

        {/* <View style={styles.searchResultGroup}>
          <View style={styles.pickContainer}>
            <Text style={styles.pickText}>Choose on map</Text>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#e5e5e5'
  },
  searchResultGroup: {
    margin: 10,
    padding: 2,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#efefef',
    backgroundColor: '#eeeeee'
  },
  pickContainer: {
    padding: 10
  },
  pickText: {
    fontSize: 15
  }
});

export default SearchList;

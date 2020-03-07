import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  StyleSheet,
  BackHandler,
  TouchableNativeFeedback
} from 'react-native';

// components
import SearchResult from './SearchResult';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function SearchList(props) {
  const [response, setResponse] = useState('');

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

  function geocoder() {
    geocodingClient
      .forwardGeocode({
        query: props.keyword,
        countries: ['np']
      })
      .send()
      .then(
        response => {
          const match = response.body;

          setResponse(parseResponse(match));
        },
        error => {
          const match = error.body;

          console.log('error:', match);
        }
      );
  }

  function handleBackButton() {
    props.setIsSearching(false);
    // to blur the InutText
    Keyboard.dismiss();
    return true;
  }

  function renderSearchResults() {
    let last = false;
    const searchResult = [];

    for (let i = 0; i < response.length; i++) {
      if (i === response.length - 1) {
        last = true;
      }
      searchResult.push(
        <SearchResult
          key={i}
          data={response[i]}
          last={last}
          setDestination={data => {
            props.setDestination(data);
            props.setIsSearching(false);
          }}
        />
      );
    }

    if (response.length !== 0) {
      return <View style={styles.searchResultGroup}>{searchResult}</View>;
    } else if (props.keyword.length !== 0) {
      return (
        <View style={styles.searchResultGroup}>
          <View style={styles.blockContainer}>
            <Text style={styles.blockText}>Sorry no result found</Text>
          </View>
        </View>
      );
    }
  }

  useEffect(() => {
    if (props.keyword !== '') {
      geocoder();
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [props.keyword]);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='always'>
        {renderSearchResults()}

        <TouchableNativeFeedback
          onPress={() => {
            props.setIsPicking(true);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.searchResultGroup}>
            <View style={styles.blockContainer}>
              <Text style={styles.blockText}>Pick a location on map</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
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
  blockContainer: {
    padding: 10
  },
  blockText: {
    fontSize: 15
  }
});

export default SearchList;

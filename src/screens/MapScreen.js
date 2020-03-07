import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// components
import Map from './../component/Map';
import SearchBox from './../component/SearchBox';
import SearchList from './../component/SearchList';

// assets
import back from './../assets/images/back.png';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function MapScreen(props) {
  const [keyword, setKeyword] = useState('');
  const [isPicking, _setIsPicking] = useState(true);
  const [destination, setDestination] = useState(null);
  const [mapStatus, _setMapStatus] = useState('picking');
  const [isSearching, _setIsSearching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

  function setIsPicking(val) {
    _setIsSearching(false);

    _setIsPicking(val);
    if (val) {
      _setMapStatus('picking');
    } else {
      _setMapStatus('normal');
    }
  }

  function setIsSearching(val) {
    _setIsPicking(false);

    _setIsSearching(val);
    _setMapStatus('normal');

    if (!val) {
      Keyboard.dismiss();
    }
  }

  function reverseGeocoder() {
    let data = null;

    data = {
      id: 'pickedDestination',
      name: 'Picked Destination',
      coordinate: pickedLocation,
      location: undefined
    };

    setDestination(data);

    // The following is the reverse geocoing code, it gives coordinate of nearest landmark
    // NOT the place the user clicked
    /*
    geocodingClient
      .reverseGeocode({
        query: pickedLocation,
        countries: ['np']
      })
      .send()
      .then(response => {
        // GeoJSON document with geocoding matches
        const match = response.body.features[0];

        if (match) {
          data = {
            id: match.id,
            name: match.text,
            coordinate: match.center,
            location: match.place_name
          };
        } else {
          data = {
            id: 'pickedDestination',
            name: 'Picked Destination',
            coordinate: pickedLocation,
            location: 'Picked Destination'
          };
        }

        setDestination(data);
      })
      .catch(error => {
        const match = error.body;
        console.log('error:', match);

        data = {
          id: 'pickedDestination',
          name: 'Picked Destination',
          coordinate: pickedLocation,
          location: 'Picked Destination'
        };

        setDestination(data);
      });
      */
  }

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {isPicking ? (
        <View style={styles.header}>
          <TouchableNativeFeedback
            onPress={() => {
              setIsPicking(false);
            }}
          >
            <Image source={back} style={styles.backIcon} />
          </TouchableNativeFeedback>

          <Text style={styles.message}>Click on map to set destination</Text>

          <TouchableNativeFeedback
            onPress={() => {
              setIsPicking(false);
              reverseGeocoder();
            }}
          >
            <View style={styles.ok}>
              <Text>OK</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        <View style={styles.header}>
          {isSearching && (
            <TouchableNativeFeedback
              onPress={() => {
                setIsSearching(false);
              }}
            >
              <Image source={back} style={styles.backIcon} />
            </TouchableNativeFeedback>
          )}
          <SearchBox setIsSearching={setIsSearching} setKeyword={setKeyword} />
        </View>
      )}

      {isSearching ? (
        <SearchList
          keyword={keyword}
          setIsPicking={setIsPicking}
          setIsSearching={setIsSearching}
          setDestination={setDestination}
        />
      ) : (
        <Map
          userInfo={props.navigation.getParam('userInfo')}
          mapStatus={mapStatus}
          destination={destination}
          setPickedLocation={setPickedLocation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  backIcon: {
    width: 30,
    height: 30
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingHorizontal: 10
  },
  ok: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15
  },
  message: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: 15
  }
});

export default MapScreen;

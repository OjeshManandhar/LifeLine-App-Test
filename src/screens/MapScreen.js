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

function MapScreen(props) {
  const [keyword, setKeyword] = useState('');
  const [isPicking, _setIsPicking] = useState(false);
  const [mapStatus, setMapStatus] = useState('normal');
  const [destination, setDestination] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

  function setIsPicking(val) {
    _setIsPicking(val);
    setIsSearching(false);
    if (val) {
      setMapStatus('picking');
    } else {
      setMapStatus('normal');
    }
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
              setDestination(pickedLocation);
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
                Keyboard.dismiss();
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

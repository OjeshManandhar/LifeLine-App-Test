import React, { useState, useEffect, useCallback } from 'react';
import { View, Keyboard, StyleSheet, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import SearchBox from 'components/SearchBox';
import SearchList from 'components/SearchList';
import ShowPickedLocationInfo from 'components/ShowPickedLocationInfo';
import AnimatedImageButton from 'components/AnimatedImageButton';

// global
import ZIndex from 'global/zIndex';
import { MapScreenStatus } from 'global/enum';

// utils
import getRoute from 'utils/getRoute';
import UserLocation from 'utils/userLocation';

// assets
import back from './../assets/images/back.png';

function MapScreen(props) {
  const [destination, setDestination] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pickedLocation, setPickedLocation] = useState(null);
  const [routesToPickedLocation, setRoutesTopickedLocation] = useState(null);
  const [screenStatus, _setScreenStatus] = useState(MapScreenStatus.mapView);

  const setScreenStatus = useCallback(
    val => {
      if (val !== MapScreenStatus.searching) {
        // Also blurs out of the Text Input
        Keyboard.dismiss();
      }

      _setScreenStatus(val);
    },
    [_setScreenStatus]
  );

  const handleBackButton = useCallback(() => {
    if (screenStatus === MapScreenStatus.showPickedLocation && pickedLocation) {
      setPickedLocation(null);
    }

    if (screenStatus !== MapScreenStatus.mapView) {
      setScreenStatus(MapScreenStatus.mapView);
      return true;
    } else {
      return false;
    }
  }, [screenStatus, setScreenStatus]);

  // Handling the Hardware Back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  // UserLocation
  useEffect(() => {
    UserLocation.init();

    return () => {
      UserLocation.clearWatch();
    };
  }, []);

  return (
    <View style={styles.container}>
      {screenStatus !== MapScreenStatus.picking && (
        <View style={styles.searchContainer}>
          <AnimatedImageButton
            in={screenStatus === MapScreenStatus.searching}
            image={back}
            timeout={0.25 * 1000}
            imageStyles={styles.backIcon}
            animationStyles={{
              enter: {
                opacity: [0, 1],
                marginLeft: [-40, 0]
              },
              exit: {
                opacity: [1, 0],
                marginLeft: [0, -40]
              }
            }}
            // onEnter={() => console.log('ON ENTER')}
            // onEntered={() => console.log('ON ENTERED')}
            // onExit={() => console.log('ON EXIT')}
            // onExited={() => console.log('ON EXITED')}
            onPress={() => {
              setScreenStatus(MapScreenStatus.mapView);
            }}
          />

          <SearchBox
            setScreenStatus={setScreenStatus}
            setSearchKeyword={setSearchKeyword}
          />
        </View>
      )}

      <View style={styles.bodyContainer}>
        <Map
          screenStatus={screenStatus}
          destination={destination}
          pickedLocation={pickedLocation}
        />

        <SearchList
          in={screenStatus === MapScreenStatus.searching}
          searchKeyword={searchKeyword}
          setPickedLocation={data => {
            setScreenStatus(MapScreenStatus.showPickedLocation);
            setPickedLocation(data);
            getRoute(data.coordinate)
              .then(routes => {
                console.log('found routes:', routes.length, routes);
                setRoutesTopickedLocation(routes);
              })
              .catch(error => {
                console.log('No routes Found:', error);
              });
          }}
        />

        <ShowPickedLocationInfo
          in={screenStatus === MapScreenStatus.showPickedLocation}
          location={pickedLocation}
          foundRoutes={
            routesToPickedLocation ? routesToPickedLocation.length : null
          }
          clearPickedLocation={() => {
            setScreenStatus(MapScreenStatus.mapView);
            setPickedLocation(null);
            setRoutesTopickedLocation(null);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    right: 10,
    height: 50,
    zIndex: ZIndex.searchBox,

    overflow: 'hidden',

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    paddingVertical: 5,
    paddingHorizontal: 20,

    borderRadius: 4,
    borderWidth: 0.25,
    borderColor: '#555555',
    backgroundColor: '#ffffff',

    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3
  },
  backIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginRight: 20
  },
  bodyContainer: {
    flex: 1,
    position: 'relative'
  }
});

export default MapScreen;

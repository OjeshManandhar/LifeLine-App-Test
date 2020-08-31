import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Keyboard, StyleSheet, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import SearchBox from 'components/SearchBox';
import SearchList from 'components/SearchList';
import ShowRouteInfo from 'components/ShowRouteInfo';
import AnimatedImageButton from 'components/AnimatedImageButton';
import ShowPickedLocationName from 'components/ShowPickedLocationName';

// global
import ZIndex from 'global/zIndex';
import { MapStatus, MapScreenStatus } from 'global/enum';

// utils
import getRoute from 'utils/getRoute';
import UserLocation from 'utils/userLocation';

// assets
import use from 'assets/images/use.png';
import finish from 'assets/images/finish.png';
import back from './../assets/images/back.png';

function MapScreen(props) {
  const [destination, setDestination] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startLocation, setStartLocation] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [mapStatus, setMapStatus] = useState(MapStatus.clear);
  const [pickedCoordinate, setPickedCoordintate] = useState(null);
  const [routeToDestination, setRouteToDestination] = useState(null);
  const [routesToPickedLocation, setRoutesToPickedLocation] = useState(null);
  const [mapScreenStatus, _setMapScreenStatus] = useState(
    MapScreenStatus.mapView
  );
  const [
    selectedRouteToPickedLocation,
    setSelectedRouteToPickedLocation
  ] = useState(0);

  const clearDestination = useCallback(() => {
    setDestination(null);
    setStartLocation(null);
    setRoutesToPickedLocation(null);
  }, [setDestination, setStartLocation, setRoutesToPickedLocation]);

  const clearPickedLocationInfo = useCallback(() => {
    setPickedLocation(null);
    setRoutesToPickedLocation(null);
    setSelectedRouteToPickedLocation(0);
  }, [
    setStartLocation,
    setPickedLocation,
    setRoutesToPickedLocation,
    setSelectedRouteToPickedLocation
  ]);

  const setMapScreenStatus = useCallback(
    val => {
      if (val !== MapScreenStatus.searching) {
        // Also blurs out of the Text Input
        Keyboard.dismiss();
      }

      _setMapScreenStatus(val);
    },
    [mapScreenStatus, _setMapScreenStatus]
  );

  const handleBackButton = useCallback(() => {
    if (mapScreenStatus === MapScreenStatus.mapView) {
      return false;
    } else if (mapScreenStatus === MapScreenStatus.showRouteInfo) {
      if (mapStatus === MapStatus.routesToPickedLocation) {
        clearPickedLocationInfo();
        setMapStatus(MapStatus.clear);
      }
      setMapScreenStatus(MapScreenStatus.mapView);
      return true;
    } else if (mapScreenStatus === MapScreenStatus.picking) {
      setPickedCoordintate(null);
      setMapStatus(MapStatus.clear);
      setMapScreenStatus(MapScreenStatus.mapView);
      return true;
    } else {
      setMapStatus(MapStatus.clear);
      setMapScreenStatus(MapScreenStatus.mapView);
      return true;
    }
  }, [
    mapStatus,
    setMapStatus,
    mapScreenStatus,
    setMapScreenStatus,
    clearPickedLocationInfo
  ]);

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
      <View style={styles.topContainer}>
        <AnimatedImageButton
          in={
            mapScreenStatus === MapScreenStatus.searching ||
            mapScreenStatus === MapScreenStatus.picking
          }
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
            setPickedCoordintate(null);
            setMapScreenStatus(MapScreenStatus.mapView);
          }}
        />

        {mapScreenStatus === MapScreenStatus.picking ? (
          <View style={styles.pickContainer}>
            <Text style={styles.pickText}>Tap to pick a location</Text>
          </View>
        ) : (
          <SearchBox
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            setMapScreenStatus={setMapScreenStatus}
          />
        )}
      </View>

      <Map
        mapStatus={mapStatus}
        destination={destination}
        startLocation={startLocation}
        pickedLocation={pickedLocation}
        mapScreenStatus={mapScreenStatus}
        pickedCoordinate={pickedCoordinate}
        setMapScreenStatus={setMapScreenStatus}
        routeToDestination={routeToDestination}
        setPickedCoordintate={setPickedCoordintate}
        routesToPickedLocation={routesToPickedLocation}
        selectedRouteToPickedLocation={selectedRouteToPickedLocation}
        setSelectedRouteToPickedLocation={setSelectedRouteToPickedLocation}
      />

      <SearchList
        in={mapScreenStatus === MapScreenStatus.searching}
        searchKeyword={searchKeyword}
        setPickedLocation={data => {
          setMapStatus(MapStatus.routesToPickedLocation);
          setMapScreenStatus(MapScreenStatus.showRouteInfo);

          setPickedLocation(data);
          getRoute(data.coordinate)
            .then(routes => {
              setRoutesToPickedLocation(routes);
              setSelectedRouteToPickedLocation(routes[0].id);
            })
            .catch(error => {
              console.log('No routes Found:', error);
            });
        }}
        switchToPicking={() => {
          setMapStatus(MapStatus.pickingLocation);
          setMapScreenStatus(MapScreenStatus.picking);
        }}
      />

      <ShowRouteInfo
        in={mapScreenStatus === MapScreenStatus.showRouteInfo}
        location={(function() {
          if (mapStatus === MapStatus.routeToDestination) {
            return destination;
          } else if (mapStatus === MapStatus.routesToPickedLocation) {
            return pickedLocation;
          }
        })()}
        useButton={(() => {
          if (mapStatus === MapStatus.routeToDestination) {
            return { image: finish, text: 'Close this route' };
          } else if (mapStatus === MapStatus.routesToPickedLocation) {
            return { image: use, text: 'Use this route' };
          }
        })()}
        routeInfo={
          mapStatus === MapStatus.routeToDestination
            ? routeToDestination
            : mapStatus === MapStatus.routesToPickedLocation
            ? routesToPickedLocation && selectedRouteToPickedLocation
              ? routesToPickedLocation.find(
                  route => route.id === selectedRouteToPickedLocation
                )
              : null
            : null
        }
        onClose={() => {
          setMapScreenStatus(MapScreenStatus.mapView);

          if (mapStatus === MapStatus.routesToPickedLocation) {
            setMapScreenStatus(MapScreenStatus.mapView);

            destination
              ? setMapStatus(MapStatus.routeToDestination)
              : setMapStatus(MapStatus.clear);
          }
        }}
        onUse={() => {
          if (mapStatus === MapStatus.routesToPickedLocation) {
            // Set Destination
            setStartLocation(UserLocation.currentLocation);
            setDestination(pickedLocation);
            setRouteToDestination(
              routesToPickedLocation.find(
                route => route.id === selectedRouteToPickedLocation
              )
            );
            clearPickedLocationInfo();

            setMapStatus(MapStatus.routeToDestination);
          } else if (mapStatus === MapStatus.routeToDestination) {
            setMapScreenStatus(MapScreenStatus.mapView);

            // Clear Destination
            clearDestination();

            setMapStatus(MapStatus.clear);
          }
        }}
      />

      <ShowPickedLocationName
        in={
          pickedCoordinate != null &&
          mapScreenStatus === MapScreenStatus.picking
        }
        pickedCoordinate={pickedCoordinate}
        setPickedLocation={data => {
          setMapStatus(MapStatus.routesToPickedLocation);
          setMapScreenStatus(MapScreenStatus.showRouteInfo);

          setPickedLocation(data);
          getRoute(data.coordinate)
            .then(routes => {
              setRoutesToPickedLocation(routes);
              setSelectedRouteToPickedLocation(routes[0].id);
            })
            .catch(error => {
              console.log('No routes Found:', error);
            });

          setPickedCoordintate(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  topContainer: {
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
  pickContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pickText: {
    fontSize: 18
  }
});

export default MapScreen;

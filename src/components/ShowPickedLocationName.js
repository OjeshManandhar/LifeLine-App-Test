import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// components
import AnimatedView from 'components/AnimatedView';

// global
import ZIndex from 'global/zIndex';

// utils
import reverseGeocoder from 'utils/reverseGeocoder';

// assets
import finish from 'assets/images/finish.png';

const containerHeight = 60;

function ShowPickedLocationName(props) {
  const [findingInfo, setFindingInfo] = useState(true);
  const [pickedLocation, setPickedLocation] = useState(null);

  useEffect(() => {
    console.log('ShowPickedLocationName:', props);

    setFindingInfo(true);

    //reverseGeocode
  }, [setFindingInfo, setPickedLocation, props.pickedCoordinate]);

  return (
    <AnimatedView
      in={props.in}
      timeout={0.5 * 1000}
      viewStyles={styles.mainContainer}
      animationStyles={{
        appear: {
          opacity: [0, 1],
          bottom: [-containerHeight, 5]
        },
        enter: {
          opacity: [0, 1],
          bottom: [-containerHeight, 5]
        },
        exit: {
          opacity: [1, 0],
          bottom: [5, -containerHeight]
        }
      }}
    >
      {!findingInfo ? (
        <View style={styles.container}>
          <Text style={styles.loading}>Loading ...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>Name</Text>
            <Text style={styles.placeLocation}>Location</Text>
          </View>
          <TouchableNativeFeedback onPress={() => console.log('Pick Location')}>
            <View style={styles.pickButton}>
              <Image source={finish} style={styles.pickIcon} />
              <Text style={styles.pickText}>Pick</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: containerHeight,
    zIndex: ZIndex.bottomInfoBox,

    backgroundColor: '#ffffff',
    borderRadius: 5,

    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  loading: {
    alignSelf: 'center',

    fontSize: 20
  },
  placeInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginRight: 7.5,

    borderWidth: 1,
    borderColor: 'black'
  },
  placeName: {
    fontSize: 23,
    lineHeight: 23,
    fontWeight: '500'
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    color: '#757575'
  },
  pickButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    borderRadius: 50,
    paddingHorizontal: 17.5,

    backgroundColor: '#1a73e8'
  },
  pickIcon: {
    width: 18.5,
    height: 18.5,
    marginRight: 10
  },
  pickText: {
    color: 'white',
    fontSize: 16
  }
});

ShowPickedLocationName.propTypes = {
  in: PropTypes.bool.isRequired
};

export default ShowPickedLocationName;

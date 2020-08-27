import React, { useEffect } from 'react';
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

// assets
import use from 'assets/images/use.png';
import cross from 'assets/images/cross.png';

const containerHeight = 100;

function ShowPickedLocationInfo(props) {
  useEffect(() => {}, []);

  function distanceToString(distance) {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`;
    } else {
      return `${parseInt(distance, 10)} m`;
    }
  }

  function timeToString(time) {
    const hours = parseInt(time / 3600, 10);
    const minutes = parseInt(time / 60 - hours * 60, 10);
    const seconds = parseInt(time - minutes * 60 - hours * 60 * 60, 10);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes} mins`;
    } else {
      return `${seconds} sec`;
    }
  }

  function routeInfo() {
    if (props.selectedRoute) {
      return (
        <React.Fragment>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>
              {timeToString(props.selectedRoute.duration)} (
              {distanceToString(props.selectedRoute.distance)})
            </Text>
          </View>

          <TouchableNativeFeedback
            onPress={() => {
              props.setDestination();
            }}
          >
            <View style={styles.useButton}>
              <Image source={use} style={styles.useIcon} />
              <Text style={styles.useText}>Use this route</Text>
            </View>
          </TouchableNativeFeedback>
        </React.Fragment>
      );
    }

    return <Text style={styles.searchingText}>Searching for routes...</Text>;
  }

  return (
    <AnimatedView
      in={props.in}
      timeout={1 * 1000}
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
      {props.location ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.placeName} numberOfLines={1}>
              {props.location.name}
            </Text>
            <TouchableNativeFeedback onPress={props.clearPickedLocation}>
              <Image source={cross} style={styles.cross} />
            </TouchableNativeFeedback>
          </View>
          <Text style={styles.placeLocation} numberOfLines={1}>
            {props.location.location}
          </Text>
          <View style={styles.footer}>{routeInfo()}</View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.placeName} numberOfLines={1}>
              Select a Destination
            </Text>
            <TouchableNativeFeedback onPress={props.clearPickedLocation}>
              <Image source={cross} style={styles.cross} />
            </TouchableNativeFeedback>
          </View>
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
    zIndex: ZIndex.routeInfoBox,

    backgroundColor: '#ffffff',
    borderRadius: 5,

    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3
  },
  placeName: {
    flex: 1,
    fontSize: 23,
    lineHeight: 23,
    fontWeight: '500',
    marginRight: 15
  },
  cross: {
    width: 20,
    height: 20
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    color: '#757575',
    marginBottom: 5
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  routeInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  routeText: {
    fontSize: 18.5,
    lineHeight: 18.5
  },
  useButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    borderRadius: 50,
    paddingHorizontal: 17.5,

    backgroundColor: '#1a73e8'
  },
  useIcon: {
    width: 18.5,
    height: 18.5,
    marginRight: 10
  },
  useText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 16,

    margin: 0,
    padding: 0
  },
  searchingText: {
    color: '#757575',
    fontSize: 20,
    lineHeight: 20
  }
});

ShowPickedLocationInfo.propTypes = {
  in: PropTypes.bool.isRequired
};

export default ShowPickedLocationInfo;

import React, { useState } from 'react';
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

// assets
import cross from 'assets/images/cross.png';

// global
import ZIndex from 'global/zIndex';

const containerHeight = 100;

function ShowDestinationInfo(props) {
  const [findingRoute, setFindingRoute] = useState(true);

  if (!props.destination) {
    return null;
  }

  return (
    <AnimatedView
      in={true}
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
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(props.destination)}</Text> */}
        <View style={styles.header}>
          <Text style={styles.placeName} numberOfLines={1}>
            {props.destination.name}
          </Text>
          <TouchableNativeFeedback
            onPress={() => {
              console.log('cross presseed');
            }}
          >
            <Image source={cross} style={styles.cross} />
          </TouchableNativeFeedback>
        </View>
        <Text style={styles.placeLocation} numberOfLines={1}>
          {props.destination.location}
        </Text>
        {findingRoute && <Text>Finding route...</Text>}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: containerHeight,
    zIndex: ZIndex.destinationInfo,

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
    marginBottom: 5
  },
  placeName: {
    flex: 1,
    fontSize: 23,
    lineHeight: 23,
    fontWeight: '500',
    marginRight: 15

    // borderWidth: 1,
    // borderColor: 'black'
  },
  cross: {
    width: 20,
    height: 20
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    color: '#757575',
    marginBottom: 15
  }
});

ShowDestinationInfo.propTypes = {
  in: PropTypes.bool.isRequired
};

export default ShowDestinationInfo;

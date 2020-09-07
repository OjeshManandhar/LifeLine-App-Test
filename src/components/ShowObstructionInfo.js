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
import trash from 'assets/images/trash.png';

const containerHeight = 60;

function ShowObstructionInfo(props) {
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
      {props.obstructionInfo ? (
        <View style={styles.container}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName} numberOfLines={1}>
              {pickedLocation.name}
            </Text>
            <Text style={styles.placeLocation} numberOfLines={1}>
              {pickedLocation.location}
            </Text>
          </View>
          <TouchableNativeFeedback
            onPress={() => console.log('Delete Obstruction')}
          >
            <View style={styles.deleteButton}>
              <Image source={trash} style={styles.deleteIcon} />
              <Text style={styles.deleteText}>Delete</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.loading} numberOfLines={1}>
            Select an obstruction
          </Text>
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
  placeInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginRight: 7.5
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
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    borderRadius: 50,
    paddingHorizontal: 17.5,

    backgroundColor: '#1a73e8'
  },
  deleteIcon: {
    width: 18.5,
    height: 18.5,
    marginRight: 10
  },
  deleteText: {
    color: 'white',
    fontSize: 16
  }
});

ShowObstructionInfo.propTypes = {
  in: PropTypes.bool.isRequired
};

export default ShowObstructionInfo;

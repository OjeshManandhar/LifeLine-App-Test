import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// assets
import pin from 'assets/images/pin.png';

function SearchResult({ data, last, setPickedLocation }) {
  return (
    <TouchableNativeFeedback onPress={() => setPickedLocation(data)}>
      <View style={styles.container}>
        <View style={styles.distance}>
          <Image source={pin} style={styles.distanceMarker} />
          {data.distance && (
            <Text style={styles.distanceText}>{data.distance} km</Text>
          )}
        </View>
        <View style={[styles.description, { borderBottomWidth: last ? 0 : 1 }]}>
          <Text style={styles.placeName} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles.placeLocation} numberOfLines={1}>
            {data.location}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  distance: {
    width: 60,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  distanceMarker: {
    width: 20,
    height: 20,
    marginBottom: 5
  },
  distanceText: {
    fontSize: 12,
    color: '#656565',
    lineHeight: 12
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    paddingRight: 20,

    borderBottomColor: '#dddddd'
  },
  placeName: {
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 5,
    fontWeight: '500'
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    color: '#757575'
  }
});

export default SearchResult;

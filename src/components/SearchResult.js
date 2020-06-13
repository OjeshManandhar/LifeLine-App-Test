import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// assets
import marker from 'assets/images/search.png';

function SearchResult({ data, last, setDestination }) {
  return (
    // <TouchableNativeFeedback onPress={() => setDestination(data)}>
    <View style={styles.container}>
      <View style={styles.distance}>
        <Image source={marker} style={styles.distanceMarker} />
        {data.distance && data.distance > 50 ? (
          <Text style={styles.distanceText}>{'>'} 50 km</Text>
        ) : (
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
    // </TouchableNativeFeedback>
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
    color: '#888888',
    lineHeight: 12
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    paddingLeft: 5,
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
    color: '#888888',
    lineHeight: 13
  }
});

export default SearchResult;

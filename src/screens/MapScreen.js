import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Map from 'component/Map';
import SearchBox from 'component/SearchBox';

// global
import ZIndex from 'global/zIndex';
import MapScreenHeaderStatus from 'global/headerStatus';

function MapScreen(props) {
  const [headerStatus, setHeaderStatus] = useState(
    MapScreenHeaderStatus.mapView
  );

  return (
    <View style={styles.container}>
      {(headerStatus === MapScreenHeaderStatus.mapView ||
        headerStatus === MapScreenHeaderStatus.seaerching) && (
        <View style={styles.searchContainer}>
          <SearchBox />
        </View>
      )}

      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    position: 'absolute',
    top: '1%',
    left: '2.5%',
    right: '2.5%',
    height: 50,
    zIndex: ZIndex.searchBox,

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
      width: -1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5
  }
});

export default MapScreen;

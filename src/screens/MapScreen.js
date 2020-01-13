import React from 'react';
import { View, StyleSheet } from 'react-native';

// components
import Map from './../component/Map';
import SearchBox from './../component/SearchBox';

function MapScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <SearchBox />
      </View>
      <Map userInfo={props.navigation.getParam('userInfo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  searchArea: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottomWidth: 2
  }
});

export default MapScreen;

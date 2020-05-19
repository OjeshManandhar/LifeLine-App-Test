import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';

// components
import Map from 'component/Map';
import SearchBox from 'component/SearchBox';
import AnimatedImageButton from 'component/AnimatedImageButton';

// global
import ZIndex from 'global/zIndex';
import { MapScreenHeaderStatus } from 'global/enum';

// assets
import back from './../assets/images/back.png';

function MapScreen(props) {
  const [headerStatus, setHeaderStatus] = useState(
    MapScreenHeaderStatus.mapView
  );

  return (
    <View style={styles.container}>
      {(headerStatus === MapScreenHeaderStatus.mapView ||
        headerStatus === MapScreenHeaderStatus.searching) && (
        <View style={styles.searchContainer}>
          <AnimatedImageButton
            in={headerStatus === MapScreenHeaderStatus.searching}
            image={back}
            timeout={0.5 * 1000}
            imageStyle={styles.backIcon}
            animationStyle={{
              enter: {
                opacity: [0, 1],
                marginLeft: [-40, 0]
              },
              exit: {
                opacity: [1, 0],
                marginLeft: [0, -40]
              }
            }}
            onEnter={() => console.log('ON ENTER')}
            onEntered={() => console.log('ON ENTERED')}
            onExit={() => console.log('ON EXIT')}
            onExited={() => console.log('ON EXITED')}
            onPress={() => {
              console.log('Header Back');
              setHeaderStatus(MapScreenHeaderStatus.mapView);
            }}
          />

          <SearchBox setHeaderStatus={setHeaderStatus} />
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
    top: 5,
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
  },
  backIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginRight: 20
  }
});

export default MapScreen;

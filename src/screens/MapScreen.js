import React, { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';

// components
import Map from 'component/Map';
import SearchBox from 'component/SearchBox';
import SearchList from 'component/SearchList';
import AnimatedImageButton from 'component/AnimatedImageButton';

// global
import ZIndex from 'global/zIndex';
import { MapScreenStatus } from 'global/enum';

// assets
import back from './../assets/images/back.png';

function MapScreen(props) {
  const [screenStatus, _setScreenStatus] = useState(MapScreenStatus.mapView);

  function setScreenStatus(val) {
    if (val === MapScreenStatus.mapView || val === MapScreenStatus.picking) {
      // Also blurs out of the Text Input
      Keyboard.dismiss();
    }

    _setScreenStatus(val);
  }

  return (
    <View style={styles.container}>
      {(screenStatus === MapScreenStatus.mapView ||
        screenStatus === MapScreenStatus.searching) && (
        <View style={styles.searchContainer}>
          <AnimatedImageButton
            in={screenStatus === MapScreenStatus.searching}
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
              setScreenStatus(MapScreenStatus.mapView);
            }}
          />

          <SearchBox setScreenStatus={setScreenStatus} />
        </View>
      )}

      <View style={styles.bodyContainer}>
        <Map />
        <SearchList in={screenStatus === MapScreenStatus.searching} />
      </View>
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
  },
  bodyContainer: {
    flex: 1,
    position: 'relative'
  }
});

export default MapScreen;

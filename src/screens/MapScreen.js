import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Map from 'component/Map';
import SearchBox from 'component/SearchBox';
// import SearchList from 'component/SearchList';
import AnimatedImageButton from 'component/AnimatedImageButton';

// global
import ZIndex from 'global/zIndex';
import { MapScreenStatus } from 'global/enum';

// assets
import back from './../assets/images/back.png';

function MapScreen(props) {
  const [headerStatus, setHeaderStatus] = useState(MapScreenStatus.mapView);

  return (
    <View style={styles.container}>
      {(headerStatus === MapScreenStatus.mapView ||
        headerStatus === MapScreenStatus.searching) && (
        <View style={styles.searchContainer}>
          <AnimatedImageButton
            in={headerStatus === MapScreenStatus.searching}
            image={back}
            timeout={0.25 * 1000}
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
            // onEnter={() => console.log('ON ENTER')}
            // onEntered={() => console.log('ON ENTERED')}
            // onExit={() => console.log('ON EXIT')}
            // onExited={() => console.log('ON EXITED')}
            onPress={() => {
              console.log('Header Back');
              setHeaderStatus(MapScreenStatus.mapView);
            }}
          />

          <SearchBox setHeaderStatus={setHeaderStatus} />
        </View>
      )}

      <View style={styles.container}>
        <Map />
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
  }
});

export default MapScreen;

import React, { useState } from 'react';
import {
  View,
  Image,
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// components
import Map from './../component/Map';
import SearchBox from './../component/SearchBox';
import SearchList from './../component/SearchList';

// assets
import back from './../assets/images/back.png';

function MapScreen(props) {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [destination, setDestination] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        {isSearching && (
          <TouchableNativeFeedback
            onPress={() => {
              setIsSearching(false);
              Keyboard.dismiss();
            }}
          >
            <Image source={back} style={styles.backIcon} />
          </TouchableNativeFeedback>
        )}
        <SearchBox setIsSearching={setIsSearching} setKeyword={setKeyword} />
      </View>

      {isSearching ? (
        <SearchList
          keyword={keyword}
          setIsSearching={setIsSearching}
          setDestination={setDestination}
        />
      ) : (
        <Map
          userInfo={props.navigation.getParam('userInfo')}
          destination={destination}
        />
      )}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2
  },
  backIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  }
});

export default MapScreen;

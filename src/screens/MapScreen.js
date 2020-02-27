import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';

// components
import Map from './../component/Map';
import SearchBox from './../component/SearchBox';
import SearchList from './../component/SearchList';

// assets
import back from './../assets/images/back.png';

function handleBackButton(isTyping, setIsTyping) {
  if (isTyping) setIsTyping(false);
}

function MapScreen(props) {
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        {isSearching && (
          <TouchableNativeFeedback
            onPress={() => {
              setIsSearching(false);
            }}
          >
            <Image source={back} style={styles.backIcon} />
          </TouchableNativeFeedback>
        )}
        <SearchBox setIsSearching={setIsSearching} setKeyword={setKeyword} />
      </View>

      {isSearching ? (
        <SearchList keyword={keyword} />
      ) : (
        <Map userInfo={props.navigation.getParam('userInfo')} />
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
    width: 35,
    height: 35
  }
});

export default MapScreen;

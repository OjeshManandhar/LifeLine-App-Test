import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// components
import Map from './../component/Map';
import SearchBox from './../component/SearchBox';
import SearchList from './../component/SearchList';

function handleBackButton(isTyping, setIsTyping) {
  if (isTyping) setIsTyping(false);
}

function MapScreen(props) {
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <SearchBox setIsTyping={setIsTyping} setKeyword={setKeyword} />
      </View>

      {isTyping ? (
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
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottomWidth: 2
  }
});

export default MapScreen;

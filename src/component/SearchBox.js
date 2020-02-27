import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// assets
import searchIcon from './../assets/images/search.png';

function SearchBox(props) {
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder='Search for...'
        value={keyword}
        onChangeText={text => setKeyword(text)}
        onFocus={() => props.setIsSearching(true)}
        // onBlur={() => props.setIsSearching(false)}
      />
      <TouchableNativeFeedback onPress={() => props.setKeyword(keyword)}>
        <Image source={searchIcon} style={styles.button} />
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  inputBox: {
    flex: 1,
    height: 40,
    fontSize: 18,
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 20,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: 'gray'
  },
  button: {
    width: 35,
    height: 35,
    padding: 10,
    margin: 10
  }
});

export default SearchBox;

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

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
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'gray'
  }
});

export default SearchBox;

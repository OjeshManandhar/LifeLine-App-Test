import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// global
import MapScreenHeaderStatus from 'global/headerStatus';

// assets
import cross from './../assets/images/cross.png';

function SearchBox(props) {
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder='Search for...'
        value={keyword}
        returnKeyType='search'
        onChangeText={text => setKeyword(text)}
        onFocus={() => props.setHeaderStatus(MapScreenHeaderStatus.searching)}
        // onSubmitEditing={() => props.setKeyword(keyword)}
        onBlur={() => props.setHeaderStatus(MapScreenHeaderStatus.mapView)}
      />

      {keyword.length > 0 && (
        <TouchableNativeFeedback
          onPress={() => {
            console.log('Clear Back');
            setKeyword('');
          }}
        >
          <Image source={cross} style={styles.crossIcon} />
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  inputBox: {
    flex: 1,
    padding: 5,
    fontSize: 18
  },
  crossIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginLeft: 20
  }
});

export default SearchBox;

import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// component
import AnimatedImageButton from 'components/AnimatedImageButton';

// global
import { MapScreenStatus } from 'global/enum';

// assets
import cross from './../assets/images/cross.png';

function SearchBox(props) {
  const [text, setText] = useState('Kalimati');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder='Search here'
        value={text}
        returnKeyType='search'
        onChangeText={text => {
          setText(text);
          props.setSearchKeyword(text);
        }}
        onFocus={() => props.setScreenStatus(MapScreenStatus.searching)}
        onSubmitEditing={() => props.setSearchKeyword(text)}
      />

      <AnimatedImageButton
        in={text.length > 0}
        image={cross}
        timeout={0.25 * 1000}
        imageStyles={styles.crossIcon}
        animationStyles={{
          enter: {
            opacity: [0, 1]
          },
          exit: {
            opacity: [1, 0]
          }
        }}
        onPress={() => {
          setText('');
          props.setSearchKeyword('');
        }}
      />
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

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { Actions } from 'react-native-router-flux';

function Detail(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Detail Screen</Text>
      <Text style={styles.textStyle}>
        Name's {props.userName} and phone is {props.phone}
      </Text>
      <Button title='Go to Home' onPress={() => Actions.home()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default Detail;

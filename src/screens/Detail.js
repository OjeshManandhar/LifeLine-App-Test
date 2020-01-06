import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Detail(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Detail Screen</Text>
      <Button
        title='Go to home'
        onPress={() => props.navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20
  }
});

export default Detail;

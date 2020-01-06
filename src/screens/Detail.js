import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Detail(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Detail Screen</Text>
      <Text style={styles.textStyle}>
        Name's {props.navigation.getParam('name')} and the number is{' '}
        {props.navigation.getParam('phone')}
      </Text>
      <Button
        title='Go to home'
        onPress={() => props.navigation.navigate('Home')}
      />
    </View>
  );
}

Detail.navigationOptions = () => {
  return {
    headerShown: true
    // default title is same as the key used for screen in AppNavigator
    // title: 'Detail'
  };
};

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

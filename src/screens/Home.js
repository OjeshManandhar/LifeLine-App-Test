import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Home(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title='Go to Detail'
        onPress={() =>
          props.navigation.navigate('Detail', {
            name: 'DeadSkull',
            phone: '1234567890'
          })
        }
      />
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

export default Home;

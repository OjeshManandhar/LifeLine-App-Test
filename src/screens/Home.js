import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Home(props) {
  const userInfo = {
    userId: 'lorem',
    userName: 'DeadSkull',
    phone: '1234567890'
  };

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
      <Button
        title='Go to Map'
        onPress={() =>
          props.navigation.navigate('Map', {
            userInfo: JSON.stringify(userInfo)
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

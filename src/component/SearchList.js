import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

function parseResponse(response) {
  console.log('parseResponse');

  return JSON.stringify(response);
}

function geocoder(keyword, setResponse, setError) {
  console.log('geocoder');

  const wordsList = keyword.split(' ').join('%20');

  console.log(wordsList);

  // GET request
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${wordsList}.json?country=np&access_token=${MAPBOX_API_KEY}`,
    {
      method: 'GET'
      //Request Type
    }
  )
    .then(response => response.json())
    //If response is in json then in success
    .then(responseJson => {
      //Success
      console.log('response:', responseJson);
      console.log('typeof response:', typeof responseJson);

      var response = parseResponse(responseJson);

      setResponse(response);
    })
    //If response is not in json then in error
    .catch(error => {
      //Error
      console.error('error:', error);
      console.error('typeof error:', typeof error);
      setError(error);
    });
}

function SearchList(props) {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  console.log('keyword:', props.keyword);

  if (props.keyword !== '') {
    geocoder(props.keyword, setResponse, setError);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>SearchList</Text>
        <Text>keyword => {props.keyword}</Text>
        <Text>response => {response}</Text>
        <Text>error => {error}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});

export default SearchList;

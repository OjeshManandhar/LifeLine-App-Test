import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// components
import AnimatedView from 'components/AnimatedView';
import SearchResult from 'components/SearchResult';

// global
import ZIndex from 'global/zIndex';

// utils
import forwardGeocoder from 'utils/forwardGeocoder';

function SearchList(props) {
  const [response, setResponse] = useState([]);

  const renderResponses = useCallback(() => {
    if (props.searchKeyword === '') return null;

    if (response.length === 0) {
      return (
        <View style={styles.searchResultGroup}>
          <View style={styles.blockContainer}>
            <Text style={styles.blockText}>Sorry no results</Text>
          </View>
        </View>
      );
    }

    const responseList = [];
    for (let i = 0; i < response.length; i++) {
      if (response.hasOwnProperty(i)) {
        responseList.push(
          <View
            key={response[i].id}
            style={[styles.blockContainer, { paddingHorizontal: 0 }]}
          >
            <SearchResult data={response[i]} last={i === response.length - 1} />
          </View>
        );
      }
    }

    return <View style={styles.searchResultGroup}>{responseList}</View>;
  }, [response, props.searchKeyword]);

  useEffect(() => {
    if (props.searchKeyword !== '') {
      forwardGeocoder(props.searchKeyword)
        .then(result => {
          setResponse(result);
          // console.log('SUCESS ', props.searchKeyword + ':', result);
        })
        .catch(error => {
          // console.log('ERROR ', props.searchKeyword + ':', error);
        });
    } else {
      setResponse([]);
    }
  }, [setResponse, props.searchKeyword]);

  return (
    <AnimatedView
      in={props.in}
      timeout={1 * 1000}
      viewStyles={styles.container}
      animationStyles={{
        // use the bottom here or the height in styles in styles.container
        enter: {
          opacity: [0, 1],
          top: [useWindowDimensions().height, 0]
          // bottom: [-useWindowDimensions().height, 0]
        },
        exit: {
          opacity: [1, 0],
          top: [0, useWindowDimensions().height]
          // bottom: [0, -useWindowDimensions().height]
        }
      }}
    >
      <ScrollView keyboardShouldPersistTaps='always'>
        {renderResponses()}

        <TouchableNativeFeedback
          onPress={() => {
            console.log('Pick on Map');
          }}
        >
          <View style={styles.searchResultGroup}>
            <View style={styles.blockContainer}>
              <Text style={styles.blockText}>Pick a location on map</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    zIndex: ZIndex.searchList,

    backgroundColor: '#e5e5e5',

    paddingTop: 60
  },
  searchResultGroup: {
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.25,
    borderColor: '#555555',
    backgroundColor: '#ffffff',

    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3
  },
  blockContainer: {
    height: 60,
    paddingHorizontal: 20
  },
  blockText: {
    fontSize: 17,
    lineHeight: 60
  }
});

SearchList.propTypes = {
  in: PropTypes.bool.isRequired
};

export default SearchList;

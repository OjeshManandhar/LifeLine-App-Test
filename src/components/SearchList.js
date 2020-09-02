import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
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

// assets
import pickMap from 'assets/images/pickMap.png';

function SearchList(props) {
  const [response, setResponse] = useState([]);

  const renderResponses = useCallback(() => {
    if (props.searchKeyword === '') return null;

    if (response.length === 0) {
      return (
        <View style={styles.searchResultGroup}>
          <View style={[styles.blockContainer, { paddingHorizontal: 20 }]}>
            <Text style={[styles.blockText, { paddingHorizontal: 0 }]}>
              Sorry no results
            </Text>
          </View>
        </View>
      );
    }

    const responseList = [];
    for (let i = 0; i < response.length; i++) {
      if (response.hasOwnProperty(i)) {
        responseList.push(
          <View key={response[i].id} style={styles.blockContainer}>
            <SearchResult
              data={response[i]}
              last={i === response.length - 1}
              setPickedLocation={props.setPickedLocation}
            />
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
          console.log('SearchList error ', props.searchKeyword + ':', error);
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

        <TouchableNativeFeedback onPress={props.switchToPicking}>
          <View style={styles.searchResultGroup}>
            <View style={styles.blockContainer}>
              <View style={styles.blockImageContainer}>
                <Image source={pickMap} style={styles.blockImage} />
              </View>
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

    backgroundColor: '#eeeeee',

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

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  blockImageContainer: {
    width: 60,

    justifyContent: 'center',
    alignItems: 'center'
  },
  blockImage: {
    width: 25,
    height: 25
  },
  blockText: {
    fontSize: 17,
    lineHeight: 60,
    paddingRight: 20
  }
});

SearchList.propTypes = {
  in: PropTypes.bool.isRequired
};

export default SearchList;

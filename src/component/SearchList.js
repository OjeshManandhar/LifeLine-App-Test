import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import PropTypes from 'prop-types';

// components
import AnimatedView from 'component/AnimatedView';

// global
import ZIndex from 'global/zIndex';
import { MapScreenStatus } from 'global/enum';

function SearchList(props) {
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
        <Text>{props.searchKeyword}</Text>
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

    padding: 5,
    paddingTop: 60
  }
});

SearchList.propTypes = {
  in: PropTypes.bool.isRequired
};

export default SearchList;

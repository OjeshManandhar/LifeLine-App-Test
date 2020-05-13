import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Animated,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// global
import { AnimationState as AS } from 'global/enum';

function AnimatedButton(props) {
  // console.log('AnimatedButton props:', props);

  const currentState = useRef(AS.initialRender);
  const [display, setDiaplay] = useState('none');

  const animationInit = useRef({}).current;
  const animationExec = useRef({}).current;

  // create animation
  useEffect(() => {}, []);

  // handle animation state change
  useEffect(() => {
    if (currentState.current === AS.initialRender) {
      if (props.in === true) {
        // start appear animation
        console.log('start appear animation');

        setDiaplay('flex');
        currentState.current = AS.in;
      } else if (props.in === false) {
        console.log('no appear animation');

        currentState.current = AS.out;
      }
    } else {
      if (
        (props.in === true && currentState.current === AS.in) ||
        (props.in === false && currentState.current === AS.out)
      ) {
        console.log('No enter/exit animation');
      }

      if (props.in === true && currentState.current === AS.out) {
        // start enter animation
        console.log('start enter animation');

        setDiaplay('flex');

        currentState.current = AS.in;
      } else if (props.in === false && currentState.current === AS.in) {
        // start exit animation
        console.log('start exit animation');

        setDiaplay('none');

        currentState.current = AS.out;
      }
    }
  }, [props.in]);

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <Image source={props.image} style={[props.imageStyle, { display }]} />
    </TouchableNativeFeedback>
  );
}

AnimatedButton.propTypes = {
  in: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  imageStyle: PropTypes.object.isRequired,
  animationStyle: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});

export default AnimatedButton;

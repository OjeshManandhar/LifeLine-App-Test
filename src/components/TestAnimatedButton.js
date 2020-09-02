import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated, TouchableNativeFeedback } from 'react-native';

// global
import { AnimationState as AS } from 'global/enum';

// hooks
import useStateWithCallback from 'hooks/useStateWithCallback';

// assets
import back from './../assets/images/back.png';

function TestAnimatedButton(props) {
  const currentState = useRef(AS.initialRender);

  const [mount, setMount] = useStateWithCallback();

  const animationInit = useRef(new Animated.Value(-40)).current;
  const animationExec = () => {
    Animated.timing(animationInit, {
      toValue: 0,
      useNativeDriver: false,
      duration: props.timeout
    }).start();
  };

  useEffect(() => {
    if (currentState.current === AS.initialRender) {
      if (props.in === true) {
        setMount(true);

        console.log('Start APPEAR Animation');

        currentState.current = AS.in;
      } else if (props.in === false) {
        setMount(false);

        console.log('No APPEAR animation');

        currentState.current = AS.out;
      }
    } else {
      if (
        (props.in === true && currentState.current === AS.in) ||
        (props.in === false && currentState.current === AS.out)
      ) {
        console.log("Don't execute enter/exit animation");
        console.log('No change in animation state');
      }

      if (props.in === true && currentState.current === AS.out) {
        setMount(true, () => {
          console.log('Start ENTER animation');

          animationExec();

          currentState.current = AS.in;
        });
      } else if (props.in === false && currentState.current === AS.in) {
        // start exit animation
        console.log('Start EXIT animation');

        setMount(false);

        currentState.current = AS.out;
      }
    }
  }, [props.in]);

  if (mount) {
    return (
      // <Animated.View
      //   style={[
      //     // { opacity: 0.5 }
      //     {
      //       opacity: animationInit
      //     }
      //   ]}
      // >
      <TouchableNativeFeedback onPress={props.onPress}>
        <Animated.Image
          source={back}
          style={[
            props.imageStyle,
            {
              margin: animationInit
            }
          ]}
        />
      </TouchableNativeFeedback>
      // </Animated.View>
    );
  } else {
    return null;
  }
}

TestAnimatedButton.propTypes = {
  in: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  imageStyle: PropTypes.object.isRequired,
  animationStyle: PropTypes.object.isRequired
};

export default TestAnimatedButton;

import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Animated,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

// global
import { AnimationState as AS } from 'global/enum';

// hooks
import useStateWithCallback from 'hooks/useStateWithCallback';

function AnimatedImageButton(props) {
  // console.log('AnimatedButton props:', props);

  const currentState = useRef(AS.initialRender);

  const [mount, setMount] = useStateWithCallback(null);
  const [animationStyle, setAnimationStyle] = useStateWithCallback({});

  const startAnimation = useCallback(
    ({ animType, onStart, onComplete }) => {
      const anim = props.animationStyle[animType];

      if (anim) {
        const animInit = {};
        const animEcex = {};
        const animStyle = {};
        const animFinish = {};

        for (let property in anim) {
          if (anim.hasOwnProperty(property)) {
            animInit[property] = new Animated.Value(anim[property][0]);

            animEcex[property] = Animated.timing(animInit[property], {
              toValue: anim[property][1],
              useNativeDriver: false,
              duration: props.timeout
            });

            animStyle[property] = animInit[property];

            animFinish[property] = false;
          }
        }

        setAnimationStyle(animStyle, animationStyle => {
          if (onStart && typeof onStart === 'function') {
            onStart();
          }

          for (let key in animEcex) {
            if (animEcex.hasOwnProperty(key)) {
              animEcex[key].start(({ finished }) => {
                animFinish[key] = true;
              });
            }
          }
        });

        if (onComplete && typeof onComplete === 'function') {
          const checkFinish = setInterval(() => {
            for (let key in animFinish) {
              if (animFinish.hasOwnProperty(key)) {
                if (animFinish[key] === false) {
                  return;
                }
              }
            }

            onComplete();
            clearInterval(checkFinish);
          }, 100);
        }
      }
    },
    [props.timeout, props.animationStyle]
  );

  // handle animation state change
  useEffect(() => {
    if (currentState.current === AS.initialRender) {
      if (props.in === true) {
        setMount(true);

        console.log('Start APPEAR animation');

        startAnimation({
          animType: 'appear',
          onStart: () => console.log('APPEAR start'),
          onComplete: () => console.log('APPEAR Complete')
        });

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
        setMount(true, mount => {
          // start enter animation
          console.log('Start ENTER animation');

          startAnimation({
            animType: 'enter',
            onStart: () => console.log('ENTER start'),
            onComplete: () => console.log('ENTER Complete')
          });

          currentState.current = AS.in;
        });
      } else if (props.in === false && currentState.current === AS.in) {
        // start exit animation
        console.log('start exit animation');

        startAnimation({
          animType: 'exit',
          onStart: () => console.log('EXIT start'),
          onComplete: () => {
            console.log('EXIT Complete');
            setMount(false);
            currentState.current = AS.out;
          }
        });
        // setMount(false);
        // currentState.current = AS.out;
      }
    }
  }, [props.in, startAnimation]);

  if (mount) {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        <Animated.Image
          source={props.image}
          style={[props.imageStyle, animationStyle]}
        />
      </TouchableNativeFeedback>
    );
  } else {
    return null;
  }
}

AnimatedImageButton.propTypes = {
  in: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  imageStyle: PropTypes.object.isRequired,
  animationStyle: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});

export default AnimatedImageButton;

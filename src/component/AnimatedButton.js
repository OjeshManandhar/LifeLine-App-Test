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

// hooks
import useStateWithCallback from 'hooks/useStateWithCallback';

function AnimatedButton(props) {
  // console.log('AnimatedButton props:', props);

  const currentState = useRef(AS.initialRender);

  const [mount, setMount] = useStateWithCallback(null);
  const [animationStyle, setAnimationStyle] = useStateWithCallback({});

  const animationInit = useRef({}).current;
  const animationExec = useRef({}).current;
  const animationStyleList = useRef({}).current;

  // create animations
  useEffect(() => {
    const styles = props.animationStyle;

    for (let state in styles) {
      if (
        (state === 'appear' || state === 'enter' || state === 'exit') &&
        styles.hasOwnProperty(state)
      ) {
        animationInit[state] = {};
        animationExec[state] = {};
        animationStyleList[state] = {};

        for (let key in styles[state]) {
          if (styles[state].hasOwnProperty(key)) {
            const [start, end] = styles[state][key];

            console.log('state, key, property =>', state, key, start, end);

            animationInit[state][key] = new Animated.Value(start);

            console.log('test:', animationInit[state][key]);

            animationExec[state][key] = Animated.timing(
              animationInit[state][key],
              {
                toValue: end,
                useNativeDriver: true,
                duration: props.timeout
              }
            );

            animationStyleList[state][key] = animationInit[state][key];
          }
        }
      }
    }

    // console.log('animationInit:', animationInit);
    // console.log('animationExec:', animationExec);
    console.log('animationStyleList:', animationStyleList);
  }, []);

  // handle animation state change
  useEffect(() => {
    if (currentState.current === AS.initialRender) {
      if (props.in === true) {
        setMount(true);

        // if (animationStyleList.hasOwnProperty('appear')) {
        //   setAnimationStyle(animationStyleList.appear);
        // } else if (animationStyleList.hasOwnProperty('enter')) {
        //   setAnimationStyle(animationStyleList.appear);
        // }

        // start appear animation
        console.log('start appear animation');

        // if (animationExec.hasOwnProperty('appear')) {
        //   for (let key in animationExec.appear) {
        //     if (animationExec.appear.hasOwnProperty(key)) {
        //       animationExec.appear[key].start();
        //     }
        //   }
        // } else if (animationExec.hasOwnProperty('enter')) {
        //   for (let key in animationExec.enter) {
        //     if (animationExec.enter.hasOwnProperty(key)) {
        //       animationExec.enter[key].start();
        //     }
        //   }
        // }

        currentState.current = AS.in;
      } else if (props.in === false) {
        setMount(false);
        console.log('no appear animation');

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
          console.log('mount:', mount);
          console.log('animationStyleList.enter:', animationStyleList.enter);

          if (animationStyleList.hasOwnProperty('enter')) {
            setAnimationStyle(animationStyleList.enter, animationStyle => {
              console.log('mount:', mount);
              console.log('animationStyle:', animationStyle);
              console.log(
                'marginLeft:',
                animationStyle.marginLeft,
                typeof animationStyle.marginLeft
              );

              // start enter animation
              console.log('start enter animation');

              if (animationExec.hasOwnProperty('enter')) {
                for (let key in animationExec.enter) {
                  if (animationExec.enter.hasOwnProperty(key)) {
                    animationExec.enter[key].start();
                  }
                }
              }

              currentState.current = AS.in;
            });
          }
        });
        /*
        if (animationStyleList.hasOwnProperty('enter')) {
          setAnimationStyle(animationStyleList.enter);
        }

        // start enter animation
        console.log('start enter animation');

        if (animationExec.hasOwnProperty('enter')) {
          for (let key in animationExec.enter) {
            if (animationExec.enter.hasOwnProperty(key)) {
              animationExec.enter[key].start();
            }
          }
        }

        currentState.current = AS.in;
        */
      } else if (props.in === false && currentState.current === AS.in) {
        // start exit animation
        console.log('start exit animation');

        setMount(false);

        currentState.current = AS.out;
      }
    }
  }, [props.in]);

  if (mount) {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        <Image
          source={props.image}
          style={[props.imageStyle, animationStyle]}
        />
      </TouchableNativeFeedback>
    );
  } else {
    return null;
  }
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

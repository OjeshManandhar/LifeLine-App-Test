import React from 'react';
import { Animated, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

// hooks
import useAnimation from 'hooks/useAnimation';

function AnimatedImageButton({ image, imageStyles, onPress, ...props }) {
  const [mount, animationStyle] = useAnimation(props);

  if (mount) {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <Animated.Image source={image} style={[imageStyles, animationStyle]} />
      </TouchableNativeFeedback>
    );
  } else {
    return null;
  }
}

AnimatedImageButton.propTypes = {
  onExit: PropTypes.func,
  onEnter: PropTypes.func,
  onAppear: PropTypes.func,
  onExited: PropTypes.func,
  onEntered: PropTypes.func,
  onAppeared: PropTypes.func,
  in: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  imageStyles: PropTypes.object.isRequired,
  animationStyles: PropTypes.object.isRequired
};

export default AnimatedImageButton;

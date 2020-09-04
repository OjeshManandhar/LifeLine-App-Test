import React from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

// hooks
import useAnimation from 'hooks/useAnimation';

function AnimatedImageButton({ image, imageStyles, onPress, ...props }) {
  const [mount, animationStyle] = useAnimation(props);

  if (mount) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {props.useViewContainer ? (
          <View
            {...props.viewProps}
            {...(() => props.viewStyles && { style: props.viewStyles })()}
          >
            <Animated.Image
              source={image}
              style={[imageStyles, animationStyle]}
            />
          </View>
        ) : (
          <Animated.Image
            source={image}
            style={[imageStyles, animationStyle]}
          />
        )}
      </TouchableWithoutFeedback>
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
  viewProps: PropTypes.object,
  viewStyles: PropTypes.object,
  in: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  useViewContainer: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  imageStyles: PropTypes.object.isRequired,
  animationStyles: PropTypes.object.isRequired
};

export default AnimatedImageButton;

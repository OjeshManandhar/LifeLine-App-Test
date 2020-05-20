import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

// hooks
import useAnimation from 'hooks/useAnimation';

function AnimatedView({ children, viewStyles, ...props }) {
  const [mount, animationStyle] = useAnimation(props);

  if (mount) {
    return (
      <Animated.View style={[viewStyles, animationStyle]}>
        {children}
      </Animated.View>
    );
  } else {
    return null;
  }
}

AnimatedView.propTypes = {
  onExit: PropTypes.func,
  onEnter: PropTypes.func,
  onAppear: PropTypes.func,
  onExited: PropTypes.func,
  onEntered: PropTypes.func,
  onAppeared: PropTypes.func,
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  viewStyles: PropTypes.object.isRequired,
  animationStyles: PropTypes.object.isRequired
};

export default AnimatedView;

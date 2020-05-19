import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

// global
import { AnimationState as AS } from 'global/enum';

// hooks
import useStateWithCallback from 'hooks/useStateWithCallback';

function AnimatedView(porps) {
  const [mount, setMount] = useStateWithCallback(null);

  if (mount) {
    return prop.children;
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
  viewStyle: PropTypes.object.isRequired,
  animationStyle: PropTypes.object.isRequired
};

export default AnimatedView;

import { useState, useEffect, useRef } from 'react';

function useStateWithCallback(initialState = null) {
  const newState = useRef(null);
  const callCallback = useRef(false);

  const [_callback, _setCallback] = useState(null);
  const [_state, _setState] = useState(initialState);

  function setState(state, callback = null) {
    if (callback) {
      newState.current = state;
      _setCallback(() => callback);
    } else {
      _setState(state);
    }
  }

  useEffect(() => {
    if (_callback) {
      callCallback.current = true;
      _setState(newState.current);
      newState.current = null;
    }
  }, [_callback]);

  useEffect(() => {
    if (callCallback.current && _callback) {
      _callback();
      _setCallback(null);
      callCallback.current = false;
    }
  }, [_state, _callback]);

  return [_state, setState];
}

export default useStateWithCallback;

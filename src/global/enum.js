export const MapStatus = Object.freeze({
  clear: 0,
  routToDestination: 1,
  routesToPickedLocations: 2
});

export const MapScreenStatus = Object.freeze({
  mapView: 0,
  searching: 1,
  picking: 2,
  showPickedLocation: 3,
  usingRoute: 4
});

export const AnimationState = Object.freeze({
  initialRender: 0,
  in: 1,
  out: 2
});

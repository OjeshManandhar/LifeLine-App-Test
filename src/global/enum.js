export const MapStatus = Object.freeze({
  clear: 0,
  routeToDestination: 1,
  routesToPickedLocation: 2,
  pickingLocation: 3
});

export const MapScreenStatus = Object.freeze({
  mapView: 0,
  searching: 1,
  picking: 2,
  showRouteInfo: 3
});

export const AnimationState = Object.freeze({
  initialRender: 0,
  in: 1,
  out: 2
});

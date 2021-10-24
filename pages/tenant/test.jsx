import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxmaWFuZmwiLCJhIjoiY2t0amQwb3oyMWFuZzJwcnRzZG90eWZkbCJ9.zn3csz72YfegBayAqOuWDA";

const Test = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const [geoLocation, setGeoLocation] = useState({
    lat:"",
    long:""
  })
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      console.log(newViewport);
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      setGeoLocation({...geoLocation, lat: newViewport.latitude, long: newViewport.longitude});
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <div>
      <div style={{ height: "500px", width:"500px" }}>
        <MapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={handleViewportChange}
          mapStyle='mapbox://styles/alfianfl/cktjd6j0o261c18qfjwjrknzz'
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
        </MapGL>
      </div>
    </div>

  );
};

export default Test;

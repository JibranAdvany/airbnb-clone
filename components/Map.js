import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

const Map = ({ resultsData }) => {
  const [location, setLocation] = useState({});
  const coordinates = resultsData?.map(item => ({
    longitude: item.long,
    latitude: item.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jibranadvani/cks22qchd3nl718t3gqxzs7su"
      mapboxApiAccessToken={process.env.ACCESS_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {resultsData?.map(item => (
        <div key={item.long}>
          <Marker
            longitude={item.long}
            latitude={item.lat}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <p
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setLocation(item)}
              role="img"
            >
              📍
            </p>
          </Marker>
          {/* Popup - if clicked on marker */}
          {location.long === item.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setLocation({})}
              latitude={item.lat}
              longitude={item.long}
            >
              {item.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;

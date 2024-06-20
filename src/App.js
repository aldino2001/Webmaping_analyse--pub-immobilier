// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import LeftBar from './components/Main';
import ZoomButtons from './components/ZoomButton';
import Map from './components/Map';
import Login from './components/Login';
import { LoginProvider } from './components/LoginContext';
//import TopBar from './components/TopBar';

const App = () => {
  const [location, setLocation] = useState({ lat: -21.4639, lng:47.1098 });
  const [zoom, setZoom] = useState(16);
  const mapRef = useRef();
  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }, []);

  const handleZoomIn = () => {
    if (mapRef.current) {
      setZoom((prevZoom) => Math.min(prevZoom + 1, 18));
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      setZoom((prevZoom) => Math.max(prevZoom - 1, 1));
    }
  };

  return (
    <LoginProvider>
    <div>
      
      <LeftBar ref={mapRef} center={location} zoom={zoom}/>
      <Login/>
      

      
    </div>
    </LoginProvider>
  );
};

export default App;

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'; // Create this CSS file for map styling
import 'mapbox-gl/dist/mapbox-gl.css'; 
// IMPORTANT: Replace "Your_Mapbox_Access_Token_Here" with your actual Mapbox access token or use environment variable as shown below
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/light-v11', // Map style to use
      projection: 'globe',
      center: [2.3522, 48.8566], // Starting position [lng, lat]   
      zoom: 2, // Starting zoom level
      attributionControl: false,
    }).addControl(new mapboxgl.AttributionControl({
        customAttribution: 'Map design by me'
    }));
    // Array of city data
    const cities = [
        { name: 'Paris', coordinates: [2.3522, 48.8566] },
        { name: 'New York', coordinates: [-74.0060, 40.7128] },
        { name: 'San Francisco', coordinates: [-122.4194, 37.7749] },
        { name: 'London', coordinates: [-0.1278, 51.5074] },
        { name: 'Sydney', coordinates: [151.2093, -33.8688] },
      ];
  
      // Add a marker for each city
      map.on('load', function() {
        cities.forEach(city => {        
            // create DOM element for the marker
            const el = document.createElement('div');
            el.id = 'marker';

            new mapboxgl.Marker(el)
            .setLngLat(city.coordinates)
            .addTo(map);
      });
    });

    //return () => map.remove(); // Cleanup function to remove the map
  }, []); // Empty dependency array means this effect will only run once

  return <div className="map-container">
            <div id="map" ></div>
        </div>;
};

export default Map;

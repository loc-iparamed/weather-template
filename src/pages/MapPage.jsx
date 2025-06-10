import {useEffect, useRef} from 'react';
import L from 'leaflet';
import useLocalStorage from '../hooks/useLocalStorage';
import useGeolocation from '../hooks/useGeolocation';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [userPosition, setUserPosition] = useLocalStorage('USER_MARKER', {
    latitude: 0,
    longitude: 0,
  });

  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage(
    'NEARBY_MARKERS',
    [],
  );
  const location = useGeolocation();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(
        [userPosition.latitude || 10.7769, userPosition.longitude || 106.7009],
        13,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    nearbyMarkers.forEach(({latitude, longitude}) => {
      L.marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(`Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`);
    });

    mapRef.current.on('click', e => {
      const {lat, lng} = e.latlng;
      L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(`Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`);

      setNearbyMarkers(prev => [...prev, {latitude: lat, longitude: lng}]);
    });
  }, [nearbyMarkers, setNearbyMarkers, userPosition.latitude, userPosition.longitude]);

  useEffect(() => {
    setUserPosition({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    userMarkerRef.current = L.marker([location.latitude, location.longitude])
      .addTo(mapRef.current)
      .bindPopup('Your Location');

    mapRef.current.setView([location.latitude, location.longitude]);
  }, [location, userMarkerRef, mapRef, setUserPosition]);

  return (
    <div
      id="map"
      className="h-96 w-full rounded-xl shadow-lg border border-gray-700"></div>
  );
}

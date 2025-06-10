import {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import {motion} from 'framer-motion';
import {Locate, RotateCw, MapPin, Clock} from 'lucide-react';

// Thêm CSS cho Leaflet popup vào file CSS toàn cục hoặc sử dụng useEffect để thêm style
const leafletPopupStyles = `
.custom-popup .leaflet-popup-content-wrapper {
  background-color: rgba(31, 41, 55, 0.9);
  backdrop-filter: blur(8px);
  color: white;
  border-radius: 8px;
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.custom-popup .leaflet-popup-tip {
  background-color: rgba(31, 41, 55, 0.9);
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.map-popup {
  padding: 4px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}
`;

const MapComponent = ({latitude, longitude, zoom = 17, speed}) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const pathRef = useRef([]);
  const polylineRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [mapLoaded, setMapLoaded] = useState(false);
  const styleSheetRef = useRef(null);

  const busIcon = L.icon({
    iconUrl: '/template_intelschoolbus/school-bus-marker.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
  });

  useEffect(() => {
    let styleElement = null; // Create a local variable to hold the style element

    if (!styleSheetRef.current) {
      const style = document.createElement('style');
      style.textContent = leafletPopupStyles;
      document.head.appendChild(style);
      styleSheetRef.current = style;
      styleElement = style;
    } else {
      styleElement = styleSheetRef.current; // If it already exists, use the ref
    }

    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
        styleSheetRef.current = null; // Optionally reset the ref after removal
      }
    };
  }, []);

  useEffect(() => {
    const savedPath = JSON.parse(localStorage.getItem('busPath')) || [];
    pathRef.current = savedPath;
    setPathLength(savedPath.length);

    // Set last updated time
    const updateTimeDisplay = () => {
      const lastUpdate = localStorage.getItem('lastMapUpdate');
      if (lastUpdate) {
        const lastUpdateTime = new Date(parseInt(lastUpdate));
        const now = new Date();
        const diffMs = now - lastUpdateTime;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) {
          setLastUpdated('Just now');
        } else if (diffMins === 1) {
          setLastUpdated('1 minute ago');
        } else if (diffMins < 60) {
          setLastUpdated(`${diffMins} minutes ago`);
        } else {
          const hours = Math.floor(diffMins / 60);
          if (hours === 1) {
            setLastUpdated('1 hour ago');
          } else {
            setLastUpdated(`${hours} hours ago`);
          }
        }
      }
    };

    updateTimeDisplay();
    const interval = setInterval(updateTimeDisplay, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: false,
        attributionControl: false,
      }).setView([latitude || 10.784239, longitude || 106.6403606], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      // Add zoom controls to a custom position
      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(mapRef.current);

      // Add scale control
      L.control
        .scale({
          imperial: false,
          position: 'bottomleft',
        })
        .addTo(mapRef.current);

      // Add attribution in a custom way
      const attribution = L.control.attribution({
        position: 'bottomleft',
      });
      attribution.addAttribution(
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      );
      attribution.addTo(mapRef.current);

      setMapLoaded(true);
    }

    if (latitude && longitude && latitude !== 0 && longitude !== 0) {
      // Update path if position has changed
      if (
        pathRef.current.length === 0 ||
        latitude !== pathRef.current[pathRef.current.length - 1][0] ||
        longitude !== pathRef.current[pathRef.current.length - 1][1]
      ) {
        pathRef.current.push([latitude, longitude]);
        localStorage.setItem('busPath', JSON.stringify(pathRef.current));
        localStorage.setItem('lastMapUpdate', Date.now().toString());
        setLastUpdated('Just now');
        setPathLength(pathRef.current.length);
      }

      // Update or create marker
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
        markerRef.current.getPopup().setContent(
          `<div class="map-popup">
            <h3 class="text-lg font-bold">School Bus</h3>
            <div class="flex items-center mt-2">
              <div class="mr-2">🚌</div>
              <div>Speed: ${speed.toFixed(1)} km/h</div>
            </div>
            <div class="flex items-center mt-1">
              <div class="mr-2">📍</div>
              <div>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</div>
            </div>
          </div>`,
        );
      } else {
        markerRef.current = L.marker([latitude, longitude], {icon: busIcon})
          .addTo(mapRef.current)
          .bindPopup(
            `<div class="map-popup">
              <h3 class="text-lg font-bold">School Bus</h3>
              <div class="flex items-center mt-2">
                <div class="mr-2">🚌</div>
                <div>Speed: ${speed.toFixed(1)} km/h</div>
              </div>
              <div class="flex items-center mt-1">
                <div class="mr-2">📍</div>
                <div>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</div>
              </div>
            </div>`,
            {className: 'custom-popup'},
          );
      }

      if (polylineRef.current) {
        polylineRef.current.setLatLngs(pathRef.current);
      } else if (pathRef.current.length > 1) {
        polylineRef.current = L.polyline(pathRef.current, {
          color: '#3B82F6',
          weight: 4,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round',
          dashArray: '0, 10',
          dashOffset: '0',
        }).addTo(mapRef.current);

        let offset = 0;
        setInterval(() => {
          offset = (offset + 1) % 10;
          if (polylineRef.current) {
            polylineRef.current.setStyle({dashOffset: String(-offset)});
          }
        }, 100);
      }

      mapRef.current.panTo([latitude, longitude], {animate: true, duration: 1});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, speed, zoom]);

  const clearPath = () => {
    localStorage.removeItem('busPath');
    pathRef.current = [];
    setPathLength(0);

    if (polylineRef.current && mapRef.current) {
      mapRef.current.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }
  };

  const focusCurrentLocation = () => {
    if (mapRef.current && latitude && longitude) {
      mapRef.current.flyTo([latitude, longitude], zoom, {
        animate: true,
        duration: 1.5,
      });
    }
  };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl border border-gray-700/50 relative overflow-hidden h-full"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.2},
      }}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="p-5 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
              <MapPin className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-200">
                Live Bus Tracking
              </h2>
              <div className="flex items-center mt-1 text-xs text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-5 right-5 flex space-x-2 z-[9999]">
          <div className="bg-gray-700/30 rounded-lg p-3 flex items-center justify-between space-x-3">
            <button
              onClick={e => {
                e.stopPropagation();
                focusCurrentLocation();
              }}
              className="bg-blue-500/20 text-blue-400 h-10 w-10 flex items-center justify-center rounded-lg transition-colors hover:bg-blue-500/30"
              title="Center map on bus">
              <Locate size={20} />
            </button>

            <button
              onClick={e => {
                e.stopPropagation();
                clearPath();
              }}
              className="bg-red-500/20 text-red-400 h-10 w-10 flex items-center justify-center rounded-lg transition-colors hover:bg-red-500/30"
              title="Clear path history">
              <RotateCw size={20} />
            </button>
          </div>
        </div>

        <div className="relative flex-grow rounded-lg overflow-hidden border border-gray-700/50">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/90 z-10">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-400">Loading map...</p>
              </div>
            </div>
          )}

          <div id="map" className="w-full h-full" />

          <div className="absolute bottom-3 left-3 z-[1000] bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-300 border border-gray-700/50">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Path points: {pathLength}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapComponent;

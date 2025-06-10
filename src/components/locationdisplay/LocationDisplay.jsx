import {motion} from 'framer-motion';
import {Map, Navigation, Globe, Gauge} from 'lucide-react';

const LocationDisplay = ({name, icon: Icon, value, color}) => {
  const {latitude, longitude, gpsStatus, speed} = value;
  const isGpsActive = gpsStatus === 'OK';

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl border border-gray-700/50 p-5 flex flex-col justify-between relative overflow-hidden"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full h-3 ">
        <div className="flex items-center">
          <Icon size={24} className="mr-2" style={{color}} />
          <h2 className="text-2xl font-medium text-gray-200">{name}</h2>
        </div>
        <div
          className={`flex items-center px-2 py-1 rounded-md text-sm ${isGpsActive ? 'bg-green-900/30 text-green-400' : 'bg-orange-900/30 text-orange-400'}`}>
          <Navigation className="h-4 w-4 mr-1" />
          {isGpsActive ? 'Active' : 'Unknown'}
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center space-y-6 my-4 mb-5">
        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-violet-400 mr-2"></div>
            <span className="text-sm text-gray-400">Latitude</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-violet-400" />
            <span className="text-2xl font-semibold text-white">
              {latitude}
            </span>
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
            <span className="text-sm text-gray-400">Longitude</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-teal-400" />
            <span className="text-2xl font-semibold text-white">
              {longitude}
            </span>
          </div>
        </div>

        <div className="bg-gray-700/40 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
            <span className="text-sm text-gray-400">Speed</span>
          </div>
          <div className="flex items-center">
            <Gauge className="h-6 w-6 mr-2 text-orange-400" />
            <span className="text-2xl font-semibold text-white">
              {speed} km/h
            </span>
          </div>
        </div>
      </div>

      <div className="text-lg text-gray-100 flex justify-between items-center h-2">
        <div></div>
        <div className="flex items-center">
          <Map className="h-4 w-5 mr-1" />
          <a
            href={`https://maps.google.com/?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline">
            View on Google map
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationDisplay;

import {motion} from 'framer-motion';
import {ThermometerSun} from 'lucide-react';

const TemperatureWidget = ({temperature}) => {
  const getColor = temp => {
    if (temp < 15) return '#60A5FA'; // Cool - blue
    if (temp < 30) return '#22C55E'; // Normal - green
    if (temp < 40) return '#FACC15'; // Warm - yellow
    return '#EF4444'; // Hot - red
  };

  const getStatus = temp => {
    if (temp < 15) return 'Cool';
    if (temp < 30) return 'Normal';
    if (temp < 40) return 'Warm';
    return 'Hot';
  };

  const color = getColor(temperature);

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-xl p-5 border border-gray-700/50 flex flex-col items-center relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{y: -5, transition: {duration: 0.2}}}>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-3 mb-4">
        <ThermometerSun className="w-7 h-7 text-yellow-400" />
        <h2 className="text-2xl text-white font-semibold">Temperature</h2>
      </div>

      <div className="w-full text-center">
        <p className="text-6xl font-bold text-white mb-2">
          {temperature}°<span className="text-3xl">C</span>
        </p>
        <p className="text-md text-gray-300 tracking-wide">
          Status: <span style={{color}}>{getStatus(temperature)}</span>
        </p>
      </div>

      <div className="w-full h-3 bg-gray-700/50 rounded-full mt-6">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(temperature, 100)}%`,
            backgroundColor: color,
          }}></div>
      </div>

      <div className="w-full mt-2 text-xs text-gray-400 flex justify-between">
        <span>0°C</span>
        <span>50°C</span>
        <span>100°C</span>
      </div>
    </motion.div>
  );
};

export default TemperatureWidget;

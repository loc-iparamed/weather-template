import {motion} from 'framer-motion';
import {Droplet} from 'lucide-react';

const HumidityWidget = ({humidity}) => {
  const getColor = h => {
    if (h < 30) return '#60A5FA'; // Dry - blue
    if (h < 60) return '#22C55E'; // Normal - green
    if (h < 80) return '#FACC15'; // Humid - yellow
    return '#EF4444'; // Very Humid - red
  };

  const getStatus = h => {
    if (h < 30) return 'Dry';
    if (h < 60) return 'Comfortable';
    if (h < 80) return 'Humid';
    return 'Very Humid';
  };

  const color = getColor(humidity);

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-xl p-5 border border-gray-700/50 flex flex-col items-center relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{y: -5, transition: {duration: 0.2}}}>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-3 mb-4">
        <Droplet className="w-7 h-7 text-blue-400" />
        <h2 className="text-2xl text-white font-semibold">Humidity</h2>
      </div>

      <div className="w-full text-center">
        <p className="text-6xl font-bold text-white mb-2">{humidity}%</p>
        <p className="text-md text-gray-300 tracking-wide">
          Status: <span style={{color}}>{getStatus(humidity)}</span>
        </p>
      </div>

      <div className="w-full h-3 bg-gray-700/50 rounded-full mt-6">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(humidity, 100)}%`,
            backgroundColor: color,
          }}></div>
      </div>

      <div className="w-full mt-2 text-xs text-gray-400 flex justify-between">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </motion.div>
  );
};

export default HumidityWidget;

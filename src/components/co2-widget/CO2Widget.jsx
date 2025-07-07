import {motion} from 'framer-motion';
import {Cloud} from 'lucide-react';

const CO2Widget = ({co2Level}) => {
  const getColor = level => {
    if (level < 150) return '#22C55E'; // Excellent
    if (level < 350) return '#FACC15'; // Moderate
    if (level < 500) return '#FB923C'; // Poor
    return '#EF4444'; // Hazardous
  };

  const getStatus = level => {
    if (level < 150) return 'Excellent';
    if (level < 350) return 'Moderate';
    if (level < 500) return 'Poor';
    return 'Hazardous';
  };

  const color = getColor(co2Level);

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-gray-700/50 flex flex-col items-center relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{y: -5, transition: {duration: 0.2}}}>
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-4 mb-6">
        <Cloud className="w-8 h-8  " style={{color: '#8B5CF6'}} />
        <h2 className="text-3xl text-white font-semibold">CO₂ Concentration</h2>
      </div>

      <div className="w-full text-center mb-6">
        <p className="text-6xl font-extrabold text-white mb-2">
          {co2Level}
          <span className="text-2xl font-medium text-gray-400"> ppm</span>
        </p>
        <p className="text-lg text-gray-300 tracking-wide">
          Air Quality: <span style={{color}}>{getStatus(co2Level)}</span>
        </p>
      </div>

      <div className="relative w-full h-5 bg-gray-700/50 rounded-full ">
        <div
          className="absolute h-5 rounded-full transition-all duration-500  "
          style={{
            width: `${Math.min(co2Level / 20, 100)}%`,
            backgroundColor: color,
          }}></div>
      </div>

      <div className="w-full mt-4 text-sm text-gray-400 flex justify-between">
        <span>0 ppm</span>
        <span>350 ppm</span>
        <span>500 ppm</span>
      </div>
    </motion.div>
  );
};

export default CO2Widget;

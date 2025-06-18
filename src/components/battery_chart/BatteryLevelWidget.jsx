import {motion} from 'framer-motion';
import {BatteryCharging, Zap} from 'lucide-react';

const BatteryLevelWidget = ({level}) => {
  const batteryLevel = Math.max(0, Math.min(100, level));

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-700/50 w-full relative overflow-hidden"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      {/* Blurred Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">Battery Status</h2>
        <div className="flex items-center px-3 py-1 bg-gray-700/50 rounded-md text-sm text-purple-300">
          <Zap className="w-4 h-4 mr-1" />
          Live
        </div>
      </div>

      {/* Battery Horizontal Bar */}
      <div className="flex items-center justify-between w-full mt-4">
        <div className="relative w-full h-14 border-4 border-purple-500 rounded-xl flex items-center">
          <div
            className="h-full bg-[#b053eb] rounded-l-md transition-all duration-500"
            style={{width: `${batteryLevel}%`}}
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-semibold text-lg">
            {batteryLevel}%
          </div>
        </div>

        {/* Icon */}
        <BatteryCharging
          size={48}
          className="ml-4 text-purple-400 opacity-80"
          strokeWidth={1.5}
        />
      </div>
    </motion.div>
  );
};

export default BatteryLevelWidget;

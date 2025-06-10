import ProgressBar from '@ramonak/react-progress-bar';
import {motion} from 'framer-motion';
import {Thermometer} from 'lucide-react';

const ThermalCpu = ({cpuTemp}) => {
  const getTempColor = temp => {
    if (temp < 50) return '#15ffbf'; // Cool - green
    if (temp < 65) return '#ffa500'; // Warm - orange
    if (temp < 80) return '#FACC15'; // Hot - yellow
    return '#EF4444';
  };

  const getTempStatus = temp => {
    if (temp < 50) return 'Normal';
    if (temp < 65) return 'Warm';
    if (temp < 80) return 'Hot';
    return 'Critical';
  };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-5 border border-gray-700/50 flex flex-col justify-between relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1, duration: 0.1}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-orange-400" />
          <h2 className="text-xl font-medium text-gray-200">CPU Temperature</h2>
        </div>
        <div
          className="px-2 py-1 bg-gray-700/50 rounded-md text-xs"
          style={{color: getTempColor(cpuTemp)}}>
          {getTempStatus(cpuTemp)}
        </div>
      </div>

      <div className="flex items-center justify-center my-4">
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center border-8 border-gray-700/50"
            style={{
              borderLeftColor: getTempColor(cpuTemp),
              borderTopColor: getTempColor(cpuTemp),
            }}>
            <p className="text-4xl font-bold text-gray-100">
              {cpuTemp}
              <span className="text-lg font-normal text-gray-400">°C</span>
            </p>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
            <div
              className="w-2 h-2 rounded-full"
              style={{backgroundColor: getTempColor(cpuTemp)}}></div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-400 px-1">
          <span>0°C</span>
          <span>50°C</span>
          <span>100°C</span>
        </div>
        <ProgressBar
          completed={cpuTemp}
          maxCompleted={100}
          bgColor={getTempColor(cpuTemp)}
          baseBgColor="#374151"
          height="12px"
          width="100%"
          isLabelVisible={false}
          borderRadius="6px"
        />
        <div className="flex justify-between items-center mb-2 ">
          <div className="text-sm text-gray-400">Safe range: 30-70°C</div>
          <div className="text-sm text-gray-400">
            {cpuTemp > 80
              ? 'Throttling possible'
              : cpuTemp > 65
                ? 'Monitor closely'
                : 'Operating normally'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThermalCpu;

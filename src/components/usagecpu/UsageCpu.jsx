import ProgressBar from '@ramonak/react-progress-bar';
import {motion} from 'framer-motion';
import {Droplet} from 'lucide-react';

const UsageCpu = ({cpuUsage}) => {
  const getUsageColor = usage => {
    if (usage < 50) return '#FACC15'; // Low - blue
    if (usage < 80) return '#0866ff'; // Medium - yellow #FACC15
    return '#EF4444'; // High - red
  };

  const getUsageStatus = usage => {
    if (usage < 30) return 'Low';
    if (usage < 50) return 'Normal';
    if (usage < 80) return 'High';
    return 'Very High';
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
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center">
          <Droplet className="h-5 w-5 mr-2 text-blue-400" />
          <h2 className="text-xl font-medium text-gray-200">Humidity</h2>
        </div>
        <div
          className="px-2 py-1 bg-gray-700/50 rounded-md text-xs"
          style={{color: getUsageColor(cpuUsage)}}>
          {getUsageStatus(cpuUsage)}
        </div>
      </div>

      <div className="flex items-center justify-center my-4">
        <div className="relative">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#374151"
              strokeWidth="9"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={getUsageColor(cpuUsage)}
              strokeWidth="9"
              strokeDasharray={`${cpuUsage * 2.83} 283`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="26"
              fontWeight="bold">
              {cpuUsage}%
            </text>
          </svg>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-400 px-1 ">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        <ProgressBar
          completed={cpuUsage}
          maxCompleted={100}
          bgColor={getUsageColor(cpuUsage)}
          baseBgColor="#374151"
          height="18px"
          width="100%"
          isLabelVisible={false}
          borderRadius="6px"
        />
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm text-gray-400 mb-2">
            {cpuUsage > 90
              ? 'High humidity'
              : cpuUsage > 70
                ? 'Moderate humidity'
                : 'Low humidity'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UsageCpu;

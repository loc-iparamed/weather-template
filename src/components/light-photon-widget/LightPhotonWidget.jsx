import {motion} from 'framer-motion';
import {Sun, Moon, Zap} from 'lucide-react';

const LightPhotonWidget = ({lightDetected}) => {
  const hasLight = lightDetected === 1;

  return (
    <motion.div
      className={`bg-gradient-to-br ${
        hasLight
          ? 'from-yellow-400/20 to-gray-800/70 border-yellow-400/40'
          : 'from-gray-600/20 to-gray-800/70 border-gray-500/40'
      } backdrop-blur-md shadow-2xl rounded-2xl p-6 border w-full flex flex-col items-center relative overflow-hidden`}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.2},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 ${
          hasLight ? 'bg-yellow-400/20' : 'bg-gray-400/20'
        } rounded-full blur-3xl`}></div>
      <div
        className={`absolute -bottom-24 -left-24 w-48 h-48 ${
          hasLight ? 'bg-yellow-400/20' : 'bg-gray-400/20'
        } rounded-full blur-3xl`}></div>

      <div className="flex items-center justify-between w-full mb-4">
        <h2
          className={`text-3xl font-semibold flex items-center ${
            hasLight ? 'text-yellow-400' : 'text-gray-300'
          }`}>
          <Zap className="w-6 h-6 mr-2 animate-pulse" /> Light Detection
        </h2>
        <div
          className={`flex items-center px-3 py-1 ${
            hasLight
              ? 'bg-yellow-500/10 border-yellow-300/40 text-yellow-200'
              : 'bg-gray-500/10 border-gray-300/40 text-gray-200'
          } border rounded-md text-sm`}>
          {hasLight ? (
            <>
              <Sun className="w-4 h-4 mr-1" /> Detected
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 mr-1" /> No Light
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center mt-20">
        {hasLight ? (
          <>
            <Sun size={200} className="text-yellow-300 animate-pulse mb-10" />
            <span className="text-yellow-200 text-6xl font-semibold">
              Light Detected
            </span>
          </>
        ) : (
          <>
            <Moon size={200} className="text-gray-400 animate-fade-in mb-10" />
            <span className="text-gray-300 text-6xl font-medium">
              No Light Detected
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LightPhotonWidget;

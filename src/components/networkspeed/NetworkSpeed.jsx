import {motion} from 'framer-motion';
import {ArrowUp, Sun} from 'lucide-react';
import Speedometer, {
  Background,
  Arc,
  Progress,
  Indicator,
} from 'react-speedometer';

const NetworkSpeed = ({speed}) => {
  // const getSpeedQuality = speed => {
  //   if (speed < 5) return {text: 'Slow', color: '#ff3200'};
  //   if (speed < 15) return {text: 'Good', color: '#ddff00'};
  //   return {text: 'Excellent', color: '#15ffbf'};
  // };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-5 border border-gray-700/50 w-full flex flex-col items-center relative overflow-hidden"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="flex items-center justify-between  w-full mb-2">
        <h2 className="text-2xl font-medium text-gray-100">Light Density</h2>
        <div className="flex items-center px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
          <ArrowUp className="w-3 h-3 mr-1" />
          Upload
        </div>
      </div>
      <div className="w-full h-200 flex justify-center relative mt-10">
        <Speedometer
          value={speed}
          max={30}
          accentColor="#facc15"
          angle={180}
          width={650}
          height={350}
          fontFamily="Inter, sans-serif">
          <Background angle={180} color="#facc15" opacity={0.15} />
          <Arc arcWidth={20} color="#3a3a3a" />
          <Progress arcWidth={20} color="#facc15" />
          <Indicator>
            {(value, textProps) => (
              <g>
                <text
                  {...textProps}
                  fontSize={65}
                  fill="white"
                  x={325}
                  y={220}
                  textAnchor="middle"
                  fontWeight="bold">
                  {value}
                </text>
                <text
                  {...textProps}
                  fontSize={25}
                  fill="white"
                  x={325}
                  y={260}
                  textAnchor="middle"
                  opacity={0.7}>
                  Lumens
                </text>
              </g>
            )}
          </Indicator>
        </Speedometer>

        <div className="absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white opacity-20">
          <Sun size={90} strokeWidth={1.5} color="white" />
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkSpeed;

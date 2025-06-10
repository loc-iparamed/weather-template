import {motion} from 'framer-motion';
import {Wifi, ArrowUp} from 'lucide-react';
import Speedometer, {
  Background,
  Arc,
  Progress,
  Indicator,
} from 'react-speedometer';

const NetworkSpeed = ({speed}) => {
  const getSpeedQuality = speed => {
    if (speed < 5) return {text: 'Slow', color: '#ff3200'};
    if (speed < 15) return {text: 'Good', color: '#ddff00'};
    return {text: 'Excellent', color: '#15ffbf'};
  };

  const speedQuality = getSpeedQuality(speed);

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
        <h2 className="text-xl font-medium text-gray-100">Network Speed</h2>
        <div className="flex items-center px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
          <ArrowUp className="w-3 h-3 mr-1" />
          Upload
        </div>
      </div>

      <div className="w-full h-200 flex justify-center relative mt-10">
        <Speedometer
          value={speed}
          max={30}
          accentColor="grey"
          angle={180}
          width={650}
          height={350}
          fontFamily="Inter, sans-serif">
          <Background angle={180} color="#05a8b2" opacity={0.2} />
          <Arc arcWidth={20} color="#2a2a3c" />
          <Progress arcWidth={20} color={speedQuality.color} />
          <Indicator>
            {(value, textProps) => (
              <g>
                <text
                  {...textProps}
                  fontSize={65}
                  fill="white"
                  x={325}
                  y={200}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontWeight="bold">
                  {value}
                </text>
                <text
                  {...textProps}
                  fontSize={25}
                  fill="white"
                  x={325}
                  y={230}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  opacity={0.7}>
                  Mbps
                </text>
                <text
                  {...textProps}
                  fontSize={20}
                  fill={speedQuality.color}
                  x={325}
                  y={260}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontWeight="medium">
                  {speedQuality.text}
                </text>
              </g>
            )}
          </Indicator>
        </Speedometer>

        <div className="absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white opacity-20">
          <Wifi size={90} strokeWidth={1.5} color="white" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full mt-12">
        <div className="bg-gray-700/30 rounded-lg p-2 text-center">
          <div className="text-base text-gray-400">Latency</div>
          <div className="text-lg font-medium text-white">
            {Math.round(30 - speed * 0.8)}ms
          </div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-2 text-center">
          <div className="text-base text-gray-400">Packet Loss</div>
          <div className="text-lg font-medium text-white">
            {Math.round(speed * 0.1)}%
          </div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-2 text-center">
          <div className="text-base text-gray-400">Signal</div>
          <div className="text-lg font-medium text-white">
            {Math.min(100, 60 + speed * 1.5)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkSpeed;

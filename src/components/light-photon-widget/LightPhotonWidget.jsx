import {motion} from 'framer-motion';
import {Sun, Zap} from 'lucide-react';
import Speedometer, {
  Background,
  Arc,
  Progress,
  Indicator,
} from 'react-speedometer';

const LightPhotonWidget = ({photonValue}) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-yellow-500/10 to-gray-800/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-yellow-500/30 w-full flex flex-col items-center relative overflow-hidden"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.2},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-3xl font-semibold text-yellow-400 flex items-center">
          <Zap className="w-6 h-6 mr-2 animate-pulse" /> Light Intensity
        </h2>
        <div className="flex items-center px-3 py-1 bg-yellow-500/10 border border-yellow-300/40 rounded-md text-sm text-yellow-200">
          <Sun className="w-4 h-4 mr-1" /> Emission
        </div>
      </div>

      <div className="w-full h-[420px] flex justify-center relative">
        <Speedometer
          value={photonValue}
          max={1000}
          accentColor="#facc15"
          angle={180}
          width={680}
          height={360}
          fontFamily="Inter, sans-serif">
          <Background angle={180} color="#facc15" opacity={0.15} />
          <Arc arcWidth={24} color="#1f2937" />
          <Progress arcWidth={24} color="#facc15" />
          <Indicator>
            {(value, textProps) => (
              <g>
                <text
                  {...textProps}
                  fontSize={64}
                  fill="white"
                  x={340}
                  y={230}
                  textAnchor="middle"
                  fontWeight="bold">
                  {value}
                </text>
                <text
                  {...textProps}
                  fontSize={20}
                  fill="#facc15"
                  x={340}
                  y={270}
                  textAnchor="middle"
                  opacity={0.8}>
                  photons/s·m²
                </text>
              </g>
            )}
          </Indicator>
        </Speedometer>

        <div className="absolute top-[28%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 opacity-80">
          <Sun size={90} strokeWidth={1.5} className="animate-spin-slow" />
        </div>
      </div>
    </motion.div>
  );
};

export default LightPhotonWidget;

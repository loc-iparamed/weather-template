import {motion} from 'framer-motion';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-speedometer';

const SpeedometerComponent = ({speed}) => {
  const getMarkColor = value => {
    if (value < 40) return '#15ffbf';
    if (value < 80) return '#ddff00';
    return '#ff3200';
  };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-4 border border-gray-700/50 w-full flex flex-col items-center relative overflow-hidden"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-xl font-medium text-gray-100">Speedometer</h2>
        <div className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
          LIVE
        </div>
      </div>

      <div className="w-full h-19 flex justify-center">
        <Speedometer
          value={speed}
          max={110}
          accentColor="grey"
          angle={250}
          width={360}
          height={360}
          fontFamily="Inter, sans-serif">
          <Background angle={360} color="#141526" opacity={0.2} />
          <Arc arcWidth={4} color="#2a2a3c" />
          <Needle
            baseOffset={40}
            circleRadius={15}
            offset={60}
            color="#ffffff"
            baseColor="#15ffbf"
            circleColor="#15ffbf"
          />
          <Progress arcWidth={12} color={'white'} opacity={0.5} />
          <Marks step={10} fontSize={18} lineSize={18} numbersRadius={30}>
            {mark => (
              <>
                <line
                  x1={mark.coordinates.x1}
                  y1={mark.coordinates.y1}
                  x2={mark.coordinates.x2}
                  y2={mark.coordinates.y2}
                  stroke={getMarkColor(mark.value)}
                  strokeWidth={mark.isEven ? 3 : 2}
                  strokeLinecap="round"
                />

                <text
                  {...mark.textProps}
                  fontSize={18}
                  fill={getMarkColor(mark.value)}
                  fontWeight="bold"
                  textAnchor="middle">
                  {mark.value}
                </text>
              </>
            )}
          </Marks>
          <Indicator>
            {(value, textProps) => (
              <>
                <text
                  {...textProps}
                  fontSize={45}
                  fill="white"
                  x={180}
                  y={280}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontWeight="bold">
                  {value}
                </text>
                <text
                  {...textProps}
                  fontSize={20}
                  fill="white"
                  x={180}
                  y={305}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  opacity={0.7}>
                  km/h
                </text>
              </>
            )}
          </Indicator>
        </Speedometer>
      </div>
    </motion.div>
  );
};

export default SpeedometerComponent;

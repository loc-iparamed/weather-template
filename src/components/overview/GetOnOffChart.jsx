import {motion} from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {Thermometer, BarChart2, Droplet} from 'lucide-react';

const COLORS = ['#ff8c19', '#0866ff'];

const GetOnOffChart = ({peopleGetOn, peopleGetOff}) => {
  const GET_ON_OFF_DATA = [
    {
      name: 'Temperature',
      value: peopleGetOn ?? 0,
      icon: Thermometer,
      unit: '°C',
    },
    {name: 'Humidity', value: peopleGetOff ?? 0, icon: Droplet, unit: '%'},
  ];

  const maxValue = Math.max(peopleGetOn ?? 0, peopleGetOff ?? 0, 1);

  const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800/90 backdrop-blur-md p-3 rounded-lg border border-gray-700/50 shadow-lg">
          <p className="text-sm font-medium text-white mb-1">{data.name}</p>
          <div className="flex items-center">
            <data.icon
              size={14}
              className="mr-1"
              style={{color: payload[0].color}}
            />
            <p className="text-sm text-gray-300">
              <span className="font-bold" style={{color: payload[0].color}}>
                {data.value}
              </span>
              {data.unit}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-5 border border-gray-700/50 relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1, duration: 0.3}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.2},
      }}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center h-1 justify-between mb-4">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-400" />
          <h2 className="text-2xl font-medium text-gray-200">Climate Chart</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        {GET_ON_OFF_DATA.map((item, index) => (
          <motion.div
            key={item.name}
            className="bg-gray-700/30 rounded-lg p-1 flex items-center justify-between"
            whileHover={{scale: 1.02}}>
            <div className="flex items-center">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{backgroundColor: `${COLORS[index]}20`}}>
                <item.icon size={16} style={{color: COLORS[index]}} />
              </div>
              <div className="ml-3">
                <div className="text-lg text-gray-400">{item.name}</div>
                <div className="text-xl font-bold text-white">{item.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-36 mt-1">
        <ResponsiveContainer width="100%" height="120%">
          <BarChart
            data={GET_ON_OFF_DATA}
            barCategoryGap={40}
            margin={{top: 10, right: 10, left: -20, bottom: 10}}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(75, 85, 99, 0.2)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <YAxis
              stroke="white"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              domain={[0, maxValue + Math.ceil(maxValue * 0.2)]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              barSize={200}
              animationDuration={1000}
              animationEasing="ease-out">
              {GET_ON_OFF_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                  style={{
                    filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GetOnOffChart;

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
import {Thermometer, Droplet, BarChart2} from 'lucide-react';

const COLORS = ['#ff8c19', '#0866ff'];

const ClinicNode2Chart = ({temperature, humidity}) => {
  const data = [
    {
      name: 'Temperature',
      value: temperature,
      icon: Thermometer,
      unit: '°C',
    },
    {
      name: 'Humidity',
      value: humidity,
      icon: Droplet,
      unit: '%',
    },
  ];

  const maxValue = Math.max(temperature, humidity, 1);

  const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-gray-800/90 backdrop-blur-md p-3 rounded-lg border border-gray-700/50 shadow-lg">
          <p className="text-sm font-medium text-white mb-1">{d.name}</p>
          <p className="text-sm text-gray-300">
            <span className="font-bold" style={{color: payload[0].color}}>
              {d.value}
            </span>
            {d.unit}
          </p>
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
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between h-1 mb-4">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-cyan-400" />
          <h2 className="text-2xl font-medium text-gray-200">Climate Chart</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className="bg-gray-700/30 rounded-lg p-2 flex items-center"
            whileHover={{scale: 1.02}}>
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{backgroundColor: `${COLORS[index]}20`}}>
              <item.icon size={18} style={{color: COLORS[index]}} />
            </div>
            <div className="ml-3">
              <div className="text-base text-gray-300">{item.name}</div>
              <div className="text-xl font-bold text-white">
                {item.value}
                {item.unit}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-72 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{top: 10, right: 10, left: -10, bottom: 10}}>
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
              radius={[6, 6, 0, 0]}
              barSize={138}
              animationDuration={600}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
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

export default ClinicNode2Chart;

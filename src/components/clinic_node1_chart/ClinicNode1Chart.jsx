import {motion} from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {Thermometer, Droplet, PieChart as PieChartIcon} from 'lucide-react';

const COLORS = ['#ff8b1a', '#3b82f6'];

const ClinicNode1Chart = ({temperature, humidity}) => {
  const data = [
    {name: 'Temperature', value: temperature, icon: Thermometer, unit: '°C'},
    {name: 'Humidity', value: humidity, icon: Droplet, unit: '%'},
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-cyan-400/10 to-gray-800/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-cyan-300/30 w-full flex flex-col items-center relative overflow-hidden"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.2},
      }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1}}>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center">
          <PieChartIcon className="h-6 w-6 mr-3 text-cyan-400 animate-pulse" />
          <h2 className="text-3xl font-semibold text-cyan-300">
            Climate Overview
          </h2>
        </div>
      </div>

      <div className="flex justify-around items-center w-full mb-6">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-3">
            <div className="p-3 bg-gray-700/40 rounded-full">
              <item.icon size={26} color={COLORS[index]} />
            </div>
            <div className="text-base text-gray-300">
              {item.name}:{' '}
              <span className="text-white font-semibold text-lg">
                {item.value}
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[24rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={90}
              outerRadius={150}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                borderColor: '#4B5563',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{color: '#E5E7EB'}}
              formatter={(value, name, props) => [
                `${value}${data[props.dataKey === 'Humidity' ? 1 : 0].unit}`,
                name,
              ]}
              labelFormatter={() => ''}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={12}
              wrapperStyle={{color: '#E5E7EB', fontSize: '15px'}}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ClinicNode1Chart;

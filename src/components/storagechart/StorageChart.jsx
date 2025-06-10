import {motion} from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {HardDrive, Database} from 'lucide-react';

const StorageChart = ({totalGb, usedGb, freeGb}) => {
  const COLORS = ['#ff8c19', '#00a4b2'];

  const storageData = [
    {name: 'Used', value: usedGb},
    {name: 'Free', value: freeGb},
  ];

  const usedPercentage = Math.round((usedGb / totalGb) * 100);

  const getStorageStatus = percentage => {
    if (percentage < 50) return {text: 'Plenty of space', color: '#15ffbf'};
    if (percentage < 80) return {text: 'Adequate space', color: '#FACC15'};
    return {text: 'Low storage', color: '#EF4444'};
  };

  const storageStatus = getStorageStatus(usedPercentage);

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-5 border border-gray-700/50 relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}
      transition={{delay: 0.1}}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center">
          <HardDrive className="h-5 w-5 mr-2 text-violet-300" />
          <h2 className="text-2xl font-medium text-gray-200">Storage Usage</h2>
        </div>
        <div
          className="px-2 py-1 bg-gray-700/50 rounded-md text-base"
          style={{color: storageStatus.color}}>
          {storageStatus.text}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="text-base text-gray-300">
          Total Storage:{' '}
          <span className="text-white font-semibold">
            {totalGb.toFixed(2)} GB
          </span>
        </div>
        <div className="text-base text-gray-300">
          Used:{' '}
          <span className="text-white font-semibold">{usedPercentage}%</span>
        </div>
      </div>

      <div className="h-80 w-full mt-5 flex justify-center items-center">
        <ResponsiveContainer width="120%" height="130%">
          <PieChart>
            <Pie
              data={storageData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={180}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}>
              {storageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
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
              formatter={value => [`${value.toFixed(2)} GB`, null]}
              labelFormatter={() => ''}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={value => (
                <span style={{color: '#E5E7EB', marginLeft: '8px'}}>
                  {value}:{' '}
                  {value === 'Used' ? usedGb.toFixed(2) : freeGb.toFixed(2)} GB
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-14">
        <div className="bg-gray-700/30 rounded-lg p-3 flex items-center">
          <Database className="h-5 w-5 mr-2 text-violet-300" />
          <div>
            <div className="text-base text-gray-400">Used Space</div>
            <div className="text-lg font-medium text-white">
              {usedGb.toFixed(2)} GB
            </div>
          </div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3 flex items-center">
          <Database className="h-5 w-5 mr-2 text-green-400" />
          <div>
            <div className="text-base text-gray-400">Free Space</div>
            <div className="text-lg font-medium text-white">
              {freeGb.toFixed(2)} GB
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StorageChart;

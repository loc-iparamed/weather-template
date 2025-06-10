import { motion } from 'framer-motion';

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl border border-gray-700/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: { duration: 0.2 },
      }}>
      {/* Decorative elements */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
      ></div>
      <div 
        className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: color }}
      ></div>
      
      <div className="px-6 py-6 flex flex-col h-2  relative z-10">
        <div className="flex items-center justify-between ">
          <span className="flex items-center text-2xl font-medium text-gray-200">
            <Icon size={30} className="mr-2" style={{ color }} />
            {name}
          </span>
          <div 
            className="h-8 w-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon size={25} style={{ color }} />
          </div>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <div className="relative">
            <p className="text-7xl mt-5 font-bold text-white">{value}</p>
            <div 
              className="absolute -bottom-3 left-0 h-1 w-12 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
        
        <div className="mt-10 pt-4 border-t border-gray-700/30 flex justify-between items-center">
          <div className="text-sm text-gray-400">Updated now</div>
          <div 
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {value > 0 ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
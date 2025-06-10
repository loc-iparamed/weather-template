import { motion } from 'framer-motion';

const StatCardCustom = ({ name, icon: Icon, value, color }) => {
  const getLighterColor = (hexColor) => {
    return `${hexColor}40`;
  };

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
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          background: `radial-gradient(circle at top right, ${color}, ${getLighterColor(color)})` 
        }}
      ></div>
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700/20 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-700/10 rounded-full transform -translate-x-12 translate-y-12"></div>
      
      <div className="px-6 py-8 h-1 flex flex-col justify-between relative z-10">
        <div className="flex items-center justify-between">
          <span className="flex items-center text-2xl font-medium text-gray-200">
            <Icon size={30} className="mr-2" style={{ color }} />
            {name}
          </span>
          
          <motion.div 
            className="h-10 w-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
            whileHover={{ scale: 1.1, backgroundColor: `${color}30` }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={25} style={{ color }} />
          </motion.div>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <p className="text-8xl font-bold text-white">{value}</p>
              <motion.div 
                className="absolute -bottom-4 center h-2 rounded-full"
                style={{ backgroundColor: color, width: '40%' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex justify-between items-center pt-8 border-t border-gray-700/30">
          <div className="text-sm text-gray-400">
            {new Date().toLocaleDateString('vi-VN', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <motion.div 
            className="px-4 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: `${color}20`, 
              color: color 
            }}
            whileHover={{ scale: 1.05 }}
          >
            {value > 0 ? 'Active' : 'Inactive'}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCardCustom;
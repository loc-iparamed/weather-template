import {motion} from 'framer-motion';
import {Bell, Search, User} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
const Header = ({title}) => {
  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate('/template_intelschoolbus/users');
  };
  return (
    <motion.header
      className="bg-gray-800/70 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50"
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3}}>
      <div className="max-w-9xl mx-auto py-7 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.h1
              className="text-10xl md:text-5xl font-bold text-white relative"
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.3, delay: 0.1}}>
              {title}
              <div className="absolute -bottom-1 left-0 h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
            </motion.h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700/50 border border-gray-600/50 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <motion.button
              className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50 transition-colors"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}>
              <Bell className="h-5 w-5" />
            </motion.button>

            <motion.div
              className="relative"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}>
              <button
                className="flex items-center space-x-2 p-1 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                onClick={handleAdminClick}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-200 pr-2 hidden md:block">
                  Admin
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

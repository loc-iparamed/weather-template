import {
  MonitorIcon as MonitorCog,
  ChevronRight,
  Sun,
  ThermometerSun,
  Droplets,
  Settings,
  LogOut,
  HelpCircle,
  BatteryFull,
} from 'lucide-react';
import {memo} from 'react';
import {motion} from 'framer-motion';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const BASE_PATH = '/weather-station';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.pathname.match(/\/weather-station\/(node\d)/);
  const nodePrefix = match ? match[1] : '';

  const isNode1 = nodePrefix === 'node1';

  const SIDEBAR_ITEMS = [
    {
      name: 'Dashboard',
      icon: <MonitorCog size={20} style={{color: '#6EE7B7'}} />,
      href: `/${nodePrefix}/dashboard`,
    },

    {
      name: 'Temperature',
      icon: <ThermometerSun size={20} style={{color: '#F59E0B'}} />,
      href: `/${nodePrefix}/temperature`,
    },
    {
      name: 'Humidity',
      icon: <Droplets size={20} style={{color: '#3B82F6'}} />,
      href: `/${nodePrefix}/humidity`,
    },

    ...(isNode1
      ? [
          {
            name: 'CO2 Density',
            icon: (
              <img
                src="/weather-template/co2.svg"
                alt="CO2 Icon"
                className="h-7 w-7"
              />
            ),
            href: `/${nodePrefix}/co2`,
          },
          {
            name: 'Light Density',
            icon: <Sun size={20} style={{color: '#facc15'}} />,
            href: `/${nodePrefix}/light`,
          },

          {
            name: 'Controller',
            icon: <Settings size={18} style={{color: '#ec4899'}} />,
            href: `/${nodePrefix}/controller`,
          },
        ]
      : [
          {
            name: 'Battery',
            icon: <BatteryFull size={22} style={{color: '#b053eb'}} />,
            href: `/${nodePrefix}/battery`,
          },
        ]),
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate(`${BASE_PATH}/login`);
  };

  return (
    <motion.div
      className="fixed md:relative z-30 h-screen w-64 flex-shrink-0"
      animate={{width: 256, transition: {duration: 0.3, ease: 'easeInOut'}}}>
      <div className="h-full bg-[#1f3336] backdrop-blur-md flex flex-col border-r border-gray-700/50 shadow-xl overflow-hidden">
        {/* Logo - Nút quay về ListNode */}
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <div
            onClick={() => navigate(`${BASE_PATH}/`)}
            className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#50787e] to-[#30474b] flex items-center justify-center cursor-pointer hover:opacity-80 transition">
            <ChevronRight className="h-6 w-6 text-white rotate-180" />
          </div>
          <motion.h2 className="mr-20 text-2xl font-bold text-white">
            {isNode1 ? 'Node 1' : 'Node 2'}
          </motion.h2>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-grow px-3">
          <div className="space-y-1">
            {SIDEBAR_ITEMS.map(({name, icon, href}) => {
              const fullPath = `${BASE_PATH}${href}`;
              const isActive = location.pathname === fullPath;

              return (
                <Link key={href} to={fullPath}>
                  <motion.div
                    className={`flex items-center p-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-700/70 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
                    }`}
                    whileHover={{x: 4}}
                    whileTap={{scale: 0.98}}>
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-lg ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20'
                          : 'bg-gray-700/30'
                      }`}>
                      {icon}
                    </div>
                    <motion.div className="ml-3 flex items-center justify-between w-full">
                      <span>{name}</span>
                      {isActive && (
                        <motion.div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </motion.div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-700/30" />

          <div className="space-y-1">
            <motion.div
              className="flex items-center p-3 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/40 transition-all duration-200 cursor-pointer"
              whileHover={{x: 4}}
              whileTap={{scale: 0.98}}>
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-700/30">
                <HelpCircle size={18} className="text-gray-400" />
              </div>
              <motion.span className="ml-3">Help & Support</motion.span>
            </motion.div>

            <motion.button
              onClick={handleLogout}
              className="flex items-center w-full px-5 py-2 text-sm font-medium rounded-lg text-red-400 hover:text-white hover:bg-gray-700/40 transition-all duration-200"
              whileHover={{x: 4}}
              whileTap={{scale: 0.98}}>
              <LogOut size={20} />
              <motion.span className="ml-3">Logout</motion.span>
            </motion.button>
          </div>
        </nav>

        {/* User profile */}
        <motion.div
          className="p-4 border-t border-gray-700/50 mt-auto"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.3}}>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@maixcam.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(Sidebar);

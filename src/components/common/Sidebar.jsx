import {
  MonitorIcon as MonitorCog,
  Cpu,
  // Users,
  Cctv,
  MapPinned,
  Settings,
  Menu,
  ChevronRight,
  HardDrive,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import {useState, memo, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const BASE_PATH = '/template_intelschoolbus';

const SIDEBAR_ITEMS = [
  {name: 'Dashboard', icon: MonitorCog, color: '#3B82F6', href: '/'},
  {name: 'Camera', icon: Cctv, color: '#10B981', href: '/presents'},
  {name: 'GPS Tracker', icon: MapPinned, color: '#8B5CF6', href: '/tracking'},
  {
    name: 'Device Manager',
    icon: HardDrive,
    color: '#F59E0B',
    href: '/deviceinfo',
  },
  // {name: 'Users', icon: Users, color: '#EC4899', href: '/users'},
  {name: 'Settings', icon: Settings, color: '#6EE7B7', href: '/settings'},
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate(`${BASE_PATH}/login`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm "
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <motion.div
        className={`fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out flex-shrink-0 ${
          isMobile ? (isSidebarOpen ? 'left-0' : '-left-64') : ''
        }`}
        animate={{
          width: isSidebarOpen ? 256 : 80,
          transition: {duration: 0.3, ease: 'easeInOut'},
        }}>
        <div className="h-full bg-gray-800/90 backdrop-blur-md flex flex-col border-r border-gray-700/50 shadow-xl overflow-hidden">
          {/* Logo area */}
          <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
            <motion.div
              className="flex items-center"
              animate={{opacity: isSidebarOpen ? 1 : 0}}
              transition={{duration: 0.2}}>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              {isSidebarOpen && (
                <motion.h2
                  className="ml-3 text-xl font-bold text-white"
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.3}}>
                  EduSafeGuard
                </motion.h2>
              )}
            </motion.div>

            <motion.button
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className=" rounded-lg hover:bg-gray-700/50 transition-colors">
              {isSidebarOpen ? (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              ) : (
                <Menu className="h-5 w-5 text-white " />
              )}
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex-grow px-3">
            <div className="space-y-1">
              {SIDEBAR_ITEMS.map(({name, icon: Icon, color, href}) => {
                const isActive = location.pathname === `${BASE_PATH}${href}`;

                return (
                  <Link key={href} to={`${BASE_PATH}${href}`}>
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
                        <Icon size={18} style={{color}} />
                      </div>

                      <AnimatePresence>
                        {isSidebarOpen && (
                          <motion.div
                            className="ml-3 flex items-center justify-between w-full"
                            initial={{opacity: 0, width: 0}}
                            animate={{opacity: 1, width: 'auto'}}
                            exit={{opacity: 0, width: 0}}
                            transition={{duration: 0.2}}>
                            <span>{name}</span>
                            {isActive && (
                              <motion.div
                                className="h-2 w-2 rounded-full"
                                style={{backgroundColor: color}}
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{duration: 0.3}}
                              />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
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

                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-3"
                      initial={{opacity: 0, width: 0}}
                      animate={{opacity: 1, width: 'auto'}}
                      exit={{opacity: 0, width: 0}}
                      transition={{duration: 0.2}}>
                      Help & Support
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center w-full px-5 py-2 text-sm font-medium rounded-lg text-red-400 hover:text-white hover:bg-gray-700/40 transition-all duration-200"
                  whileHover={{x: 4}}
                  whileTap={{scale: 0.98}}
                  initial={{opacity: 0, x: -10}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: -10}}>
                  <LogOut size={20} />
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-3"
                      initial={{opacity: 0, width: 0}}
                      animate={{opacity: 1, width: 'auto'}}
                      exit={{opacity: 0, width: 0}}
                      transition={{duration: 0.2}}>
                      Logout
                    </motion.span>
                  )}
                </motion.button>
              </AnimatePresence>
            </div>
          </nav>

          {/* User profile */}
          {isSidebarOpen && (
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
          )}
        </div>
      </motion.div>

      {/* Toggle button for mobile */}
      {isMobile && !isSidebarOpen && (
        <motion.button
          className="fixed bottom-4 left-4 z-30 p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg"
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => setIsSidebarOpen(true)}>
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      )}
    </>
  );
};

export default memo(Sidebar);

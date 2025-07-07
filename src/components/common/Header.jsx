import {motion} from 'framer-motion';

const Header = ({title}) => {
  return (
    <motion.header
      className="bg-[#1f3336]/95 backdrop-blur-md shadow-lg border-b border-[#305357] sticky top-0 z-50"
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
              <div className="absolute -bottom-1 left-0 h-1 w-12 bg-gradient-to-r from-[#78b3bb] to-[#4f8d94] rounded-full"></div>
            </motion.h1>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

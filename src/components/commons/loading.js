import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="relative flex flex-col items-center">
        {/* Top text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="font-mono text-blue-600 dark:text-blue-400 text-sm">LOADING</span>
        </motion.div>
        
        {/* Main loader animation */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            />
          ))}
        </div>
        
        {/* Bottom text with gradient */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-6"
        >
          <span className="font-sans font-medium text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Please wait...
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
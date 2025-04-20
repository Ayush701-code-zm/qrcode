import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PremiumLoader = ({ message = "Loading..." }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
        <div className="flex flex-col items-center">
          {/* Fancy animated circles */}
          <div className="relative w-32 h-32 mb-6">
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-gray-700"
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-500"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-4 rounded-full border-4 border-transparent border-b-teal-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center pulsing dot */}
            <motion.div 
              className="absolute inset-0 m-auto w-4 h-4 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 h-2 rounded-full mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          {/* Message with gradient */}
          <div className="w-full text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-1">
                {message}
              </h3>
              <p className="text-gray-400 text-sm">
                {progress}% complete
              </p>
            </motion.div>
          </div>
          
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-50"
                initial={{ 
                  x: Math.random() * 100 - 50 + '%', 
                  y: Math.random() * 100 - 50 + '%',
                  opacity: 0
                }}
                animate={{ 
                  x: Math.random() * 100 - 50 + '%', 
                  y: Math.random() * 100 - 50 + '%',
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;
'use client';

import { motion } from 'framer-motion';

const TextConfig = ({ config, setConfig }) => {
  const placements = [
    { value: 'left', label: 'Left Aligned', icon: '←' },
    { value: 'center', label: 'Center Aligned', icon: '↔' }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Text Configuration</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Text Placement</h3>
        <div className="grid grid-cols-2 gap-4">
          {placements.map((placement) => (
            <motion.div
              key={placement.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setConfig({...config, format: placement.value})}
              className={`cursor-pointer p-4 rounded-lg border-2 flex items-center justify-center ${
                config.format === placement.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl mr-3">{placement.icon}</span>
              <span className="font-medium">{placement.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Selected: <span className="font-medium text-gray-700 dark:text-gray-300">
              {config.format === "left" ? "Left Aligned" : "Center Aligned"}
            </span>
          </span>
          <button 
            onClick={() => setConfig({...config, format: 'left'})}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextConfig;
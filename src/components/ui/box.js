"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "./button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Box = ({
  text = "Get Started With Exyntra Risk-free!",
  description = "Exyntra combines data, personalization, and cross-channel experiences to unify analytics, data, and operations—all powered by AI. Register now with a zero-risk free trial.",
}) => {
  const router = useRouter();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      className="relative w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[70vw] mx-auto h-auto py-8 md:py-10 flex flex-col md:flex-row items-center px-6 sm:px-8 md:px-10 bg-gradient-to-br from-[#f5f7ff] to-[#edf0ff] dark:from-[#1e293b] dark:to-[#0f172a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 mt-8 sm:mt-10 md:mt-12 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Left accent decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 md:w-4 bg-gradient-to-b from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300"></div>
      
      {/* Background decoration */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 opacity-30 blur-xl"></div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 md:gap-6 z-10">
        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-3 w-full md:max-w-[65%] ml-0 md:ml-4 text-center md:text-left">
          <motion.h3 
            className="font-bold text-gray-800 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, delay: 0.1 }
              }
            }}
          >
            {text}
          </motion.h3>
          
          <motion.p 
            className="font-normal text-gray-600 dark:text-gray-300 text-sm sm:text-base px-2 md:px-0"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, delay: 0.2 }
              }
            }}
          >
            {description}
          </motion.p>
        </div>
        
        {/* Button Section */}
        <motion.div 
          className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, delay: 0.3 }
            }
          }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
              transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              text={
                <div className="flex items-center justify-center gap-2">
                  <span>Buy Now</span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeOut",
                        repeatDelay: 0.5,
                      },
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </div>
              }
              width="w-full sm:w-40"
              height="h-12"
              className="flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 transition-all duration-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Box;
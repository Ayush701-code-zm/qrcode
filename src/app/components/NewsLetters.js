"use client";

import React from "react";
import Image from "next/image";
import Header from "../../components/commons/Header";
import { Input } from "../../components/ui/input";
import Button from "../../components/ui/button";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

function Newsletter() {
  // Animation variants consistent with previous component
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12 overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Centered Header */}
          {/* <motion.div className="text-center" variants={fadeDown}>
            <Header subtitle="Subscribe to Our Style Newsletter" />
          </motion.div> */}
          {/* <motion.h2
            className="text-center text-2xl sm:text-2xl md:text-2xl lg:text-4xl justify-center items-center font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 tracking-tight"
            variants={fadeDown}
          >
            Subscribe to Our Style Newsletter
          </motion.h2> */}
          <motion.h2
            className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl text-center font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 tracking-tight"
            variants={fadeDown}
          >
            Subscribe to Our Style Newsletter
          </motion.h2>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-16 mt-6 md:mt-12">
            {/* Image - optimized for all screen sizes */}
            <motion.div
              className="w-full md:w-2/5 flex justify-center mb-3 md:mb-0"
              variants={fadeIn}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <Image
                src="/images/Whats_logo1.png"
                alt="Large envelope"
                width={320}
                height={320}
                className="w-[280px] sm:w-[320px] md:w-[90%] lg:w-full h-auto object-contain"
              />
            </motion.div>

            {/* Text & Form Section */}
            <motion.div
              className="w-full md:w-3/5 flex flex-col"
              variants={fadeUp}
            >
              <motion.p
                className="text-base md:text-lg lg:text-normal text-gray-700 dark:text-gray-300 mt-4 w-full lg:w-full"
                variants={fadeUp}
              >
                Be the first to discover new QR design trends, limited edition
                patterns, and exclusive tutorials for creating your own custom
                QR codes for apparel. Our weekly newsletter features design
                inspiration, promotional offers, and early access to new
                customization tools. Join our community of fashion-forward tech
                enthusiasts who express their unique style through wearable QR
                designs.
              </motion.p>

              {/* Responsive Form */}
              <motion.div
                className="w-full mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4"
                variants={fadeUp}
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.08)",
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Input
                    type="email"
                    placeholder="Your email address..."
                    className="h-12 sm:h-[3.8125rem] rounded-full shadow-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 w-full focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    text={
                      <div className="flex items-center justify-center gap-2 cursor-pointer">
                        <span>Subscribe Now</span>
                        <Send size={16} />
                      </div>
                    }
                    className="w-full h-12 sm:h-[3.8125rem] flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 dark:hover:from-blue-500 dark:hover:to-purple-400 text-white shadow-lg transition-all duration-300 cursor-pointer"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Newsletter;

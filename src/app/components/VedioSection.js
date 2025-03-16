"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../components/ui/button";
import Header from "@/components/commons/Header";
import { Shield, Sparkles, Users, Play } from "lucide-react";
import { motion } from "framer-motion";

function AboutWithVideoSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants consistent with HeroSection
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="w-full overflow-hidden px-4 sm:px-6 py-12 md:py-16 mx-auto flex flex-col items-center">
      <div className="w-full max-w-[1300px]">
        {/* Video Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeDown}>
            <Header subtitle="Our Design Process" />
          </motion.div>
          <div className="mt-6 md:mt-9">
            {/* Responsive Flex Container */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              {/* Left Side - Text Content */}
              <motion.div 
                className="w-full md:w-1/2 max-w-full md:max-w-[500px] lg:max-w-[600px] flex flex-col"
                variants={fadeIn}
              >
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  <motion.h2 
                    className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 tracking-tight"
                    variants={fadeDown}
                  >
                    From Concept to Wearable QR Art
                  </motion.h2>
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-base"
                    variants={fadeUp}
                  >
                    Our innovative platform makes it simple to design functional
                    QR codes that seamlessly blend with your personal style.
                    Create codes that link to your social profiles, favorite
                    music, portfolio, or any digital content while maintaining
                    your unique aesthetic.
                  </motion.p>

                  <motion.div
                    className="mt-2 sm:mt-4"
                    variants={fadeUp}
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
                            <Play size={18} />
                            <span>Watch How It Works</span>
                          </div>
                        }
                        className="w-full sm:w-auto h-12 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div 
                className="w-full md:w-1/2 md:min-w-[300px] flex justify-center mt-8 md:mt-0"
                variants={fadeDown}
              >
                <motion.div 
                  className="relative w-full md:w-[90%] lg:w-full h-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: scrolled ? 0.98 : 1,
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.18)",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                >
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-xl shadow-2xl border">
                    <Image
                      src="/images/about_img.png"
                      alt="QR Design Process Video"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                    
                    {/* Image overlay with gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6, transition: { delay: 0.4, duration: 0.8 } }}
                    />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer"
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play size={30} className="text-purple-600 ml-1" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* About Us Section */}
        <motion.div 
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeDown}>
            <Header subtitle="About QRWear" />
          </motion.div>

          <div className="mt-8 md:mt-12">
            {/* Startup Story */}
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              variants={fadeUp}
            >
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 tracking-tight mb-4"
                variants={fadeDown}
              >
                Our Startup Journey
              </motion.h2>
              <motion.p 
                className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl"
                variants={fadeUp}
              >
                Founded in 2023, QRWear began as a small team with a big vision:
                to bridge the gap between fashion and technology. What started
                in a garage has now grown into an innovative platform
                reimagining how we interact with digital content through
                everyday clothing.
              </motion.p>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
              >
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  To democratize personal branding by making wearable technology
                  accessible, sustainable, and stylish for everyone. We believe
                  your clothing should work as hard as you do to tell your
                  unique story.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
              >
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  A world where personal expression seamlessly integrates with
                  digital connectivity, creating new opportunities for creators,
                  entrepreneurs, and individuals to share their passions and
                  build connections.
                </p>
              </motion.div>
            </motion.div>

            {/* Traction & Growth */}
            <motion.div 
              className="bg-white dark:bg-gray-800/60 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 mb-16"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.h3 
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 text-center mb-6"
                variants={fadeDown}
              >
                Our Journey So Far
              </motion.h3>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div 
                  className="text-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
                    3,500+
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Happy Customers
                  </p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
                    $750K
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Seed Funding
                  </p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
                    12
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Team Members
                  </p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
                    40+
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Countries Served
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Core Values */}
            <motion.div 
              className="mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.h3 
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 text-center mb-8"
                variants={fadeDown}
              >
                Our Core Values
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-white dark:bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                    <Sparkles size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Innovation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    We're constantly pushing the boundaries of what's possible in wearable technology, seeking creative solutions to complex problems.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white dark:bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                >
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
                    <Shield size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Integrity</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    We build trust through transparency, ethical practices, and a commitment to quality in every product we create.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white dark:bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                    <Users size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Community</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    We believe in fostering connections through technology and supporting the creative entrepreneurs who use our platform.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
  className="bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-500 dark:to-blue-400 p-8 rounded-lg shadow-xl text-center"
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  whileHover={{
    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
    scale: 1.01,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }}
>
  <motion.h3
    className="text-xl sm:text-2xl font-bold text-white mb-4"
    variants={fadeDown}
  >
    Ready to Join the QRWear Movement?
  </motion.h3>
  <motion.p
    className="text-white/90 mb-6 max-w-2xl mx-auto"
    variants={fadeUp}
  >
    Start creating your custom wearable QR designs today and turn your everyday clothing into powerful networking tools.
  </motion.p>
  <motion.div
    className="mt-2 sm:mt-4"
    variants={fadeUp}
  >
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        text={
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={18} />
            <span>Get Started Free</span>
          </div>
        }
        className="w-full sm:w-auto h-12 flex items-center justify-center gap-2 shadow-lg bg-white text-purple-600 border-4 border-white hover:bg-gray-50 font-semibold px-8 rounded-lg transition-all duration-300 dark:bg-gray-900 dark:text-purple-300 dark:border-gray-700 dark:hover:bg-gray-800"
      />
    </motion.div>
  </motion.div>
</motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutWithVideoSection;
"use client";

import React from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Header from "@/components/commons/Header";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";

function ContactFormSection() {
  // Animation variants consistent with previous components
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

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <motion.section
        className="w-full max-w-[1350px] py-8 md:py-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="flex flex-col items-center" variants={fadeDown}>
          <Header subtitle="We're Here to Help" />
        </motion.div>
        <div className="container mx-auto mt-9">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left side - Image */}
            <motion.div className="w-full md:w-1/2" variants={fadeIn}>
              <motion.div
                className="relative h-full min-h-64 md:min-h-96"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Image
                  src="/images/video_player.png"
                  alt="QR code fashion designs"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-full h-full shadow-lg border border-gray-100 dark:border-gray-700"
                />
              </motion.div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div className="w-full md:w-1/2" variants={fadeUp}>
              <div className="flex flex-col gap-8">
                <motion.div variants={fadeUp}>
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300"
                    variants={fadeDown}
                  >
                    Questions About Custom QR Fashion?
                  </motion.h2>
                  <motion.p
                    className="text-gray-700 dark:text-gray-300 text-base"
                    variants={fadeUp}
                  >
                    Whether you need help with your QR design, have questions
                    about printing options, or want to discuss a bulk order, our
                    team is ready to assist you.
                  </motion.p>
                </motion.div>

                <motion.form
                  className="flex flex-col gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <motion.div
                    className="flex flex-col gap-4"
                    variants={staggerContainer}
                  >
                    <motion.div variants={formFieldVariants}>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        className="p-3 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={formFieldVariants}>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        className="p-3 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={formFieldVariants}>
                      <Input
                        type="text"
                        placeholder="Subject"
                        className="p-3 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </motion.div>
                    {/*
                    Phone Input Field
                    <PhoneInput
                      country={"us"}
                      inputClass="w-full p-3 rounded-md border border-gray-300"
                    /> */}

                    <motion.div variants={formFieldVariants}>
                      <Textarea
                        placeholder="Tell us about your QR code design idea or question"
                        className="p-3 rounded-md min-h-32 border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    variants={fadeUp}
                    whileHover={{
                      scale: 1.03,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      text={
                        <div className="flex items-center justify-center gap-2">
                          <MessageSquare size={18} />
                          <span>Send Message</span>
                        </div>
                      }
                      className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 dark:hover:from-blue-500 dark:hover:to-purple-400 text-white shadow-lg rounded-md transition-all duration-300"
                    />
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default ContactFormSection;

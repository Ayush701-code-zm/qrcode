"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

function FAQSection() {
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

  // Animation variants matching hero section
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

  // FAQ data
  const faqItems = [
    {
      question: "How do QR codes on clothing work?",
      answer:
        "Our QR codes are printed using high-quality, durable ink that withstands washing and wear. When scanned with any smartphone camera, they direct to your customized digital profile, website, or social media page of your choice.",
    },
    {
      question: "Are the QR codes washable?",
      answer:
        "Yes! Our QR codes are printed with specialized ink that remains scannable after multiple wash cycles. We recommend washing inside-out with cold water and avoiding harsh bleaching agents to maximize longevity.",
    },
    {
      question: "Can I customize what my QR code links to?",
      answer:
        "Absolutely. During checkout, you'll create an account that allows you to set and update your QR code destination anytime. Link to your portfolio, social media, business page, or even create a special landing page.",
    },
    {
      question: "What materials are your products made from?",
      answer:
        "We use premium 100% organic cotton for our t-shirts and hoodies, ensuring both comfort and sustainability. Our accessories feature recycled materials wherever possible, aligning with our commitment to eco-friendly fashion.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! International orders typically arrive within 7-14 business days. Shipping costs vary by location and will be calculated at checkout.",
    },
    {
      question: "What if my QR code stops working?",
      answer:
        "We stand behind our products with a lifetime QR code guarantee. If your code ever stops scanning properly due to normal wear and tear, we'll replace your item free of charge.",
    },
  ];

  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function for FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full overflow-hidden ">
      <motion.section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300"
            variants={fadeDown}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Everything you need to know about our QR code fashion products and
            services.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="mb-4 border-b border-gray-200 dark:border-gray-800 pb-4"
              variants={fadeIn}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: scrolled ? 0.98 : 1,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              whileHover={{
                scale: 1.01,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full py-4 px-2 text-left font-medium focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.question}
                </span>
                <motion.span
                  animate={{
                    rotate: openIndex === index ? 45 : 0,
                    backgroundColor:
                      openIndex === index ? "#8b5cf6" : "#6366f1",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-6 h-6 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {openIndex === index ? (
                    <Minus size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                  marginBottom: openIndex === index ? "1rem" : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <p className="px-2 py-2 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            className="mb-6 text-gray-700 dark:text-gray-300"
            variants={fadeIn}
          >
            Still have questions? We're here to help!
          </motion.p>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <button className="px-8 py-3 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 text-white rounded-md font-medium transition-all duration-300">
              <span>Contact Support</span>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default FAQSection;

"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "../../components/ui/separator";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

function FooterSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const socialLinks = [
    { icon: <Github size={20} />, label: "Github" },
    { icon: <Twitter size={20} />, label: "Twitter" },
    { icon: <Instagram size={20} />, label: "Instagram" },
    { icon: <Linkedin size={20} />, label: "LinkedIn" }
  ];

  const footerLinks = [
    { title: "Products", links: ["QR T-Shirts", "QR Hoodies", "QR Accessories", "Custom Designs"] },
    { title: "Resources", links: ["Portfolio", "How it Works", "Pricing", "Blog"] },
    { title: "Company", links: ["About Us", "Contact", "Careers", "Press Kit"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Refund Policy", "FAQ"] }
  ];

  return (
    <motion.section 
      className="flex flex-col gap-6 w-full mt-20 md:mt-40 bg-white dark:bg-gray-900 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={staggerContainer}
        >
          {/* Logo and Description */}
          <motion.div className="lg:col-span-2" variants={fadeIn}>
            <Image
              src="/images/footer_logo.png"
              alt="Epixelab Footer Logo"
              width={150}
              height={50}
              className="object-contain mb-4"
            />
            <p className="text-gray-700 dark:text-gray-300 mt-4 mb-6 max-w-md">
              Create scannable QR code fashion that connects your physical style to your digital presence. Stand out with functional, stylish designs.
            </p>
            {/* Social Media Links */}
            <motion.div 
              className="flex gap-4 mt-6"
              variants={staggerContainer}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white transform transition-all duration-300 hover:scale-110"
                  variants={fadeIn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={fadeIn}>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="bg-gray-200 dark:bg-gray-800" />

        {/* Newsletter */}
        <motion.div 
          className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={fadeIn}
        >
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Get the latest news and updates on QR fashion trends.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="p-3 rounded-l-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 w-full md:w-64"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 text-white px-4 py-2 rounded-r-md transition-all duration-300">
              Subscribe
            </button>
          </div>
        </motion.div>

        <Separator className="bg-gray-200 dark:bg-gray-800" />

        {/* Copyright */}
        <motion.div 
          className="pt-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={fadeIn}
        >
          <p className="text-gray-700 dark:text-gray-300 text-center md:text-left">
            © 2025 Epixelab. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FooterSection;
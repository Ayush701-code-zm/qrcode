"use client";

import { useState, useEffect } from "react";
import { X, Menu, ArrowRight } from "lucide-react";
import Button from "../../components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../public/images/logo.png";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on scroll position - improved implementation
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = navItems.map((item) => item.id);

      // Find the section closest to the top of the viewport
      let currentSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          // If this section is closer to the top than previous ones
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleActiveSection();

    window.addEventListener("scroll", handleActiveSection);
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  // Animation variants
  const navbarVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    scrolled: {
      y: 0,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 400, damping: 20 },
    },
    tap: {
      scale: 0.98,
    },
  };

  // Menu item text animation
  const textAnimationVariants = {
    hover: {
      scale: 1.05,
      color: "var(--color-primary)",
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  // Logo hover animation - Fixed to use keyframes instead of spring
  const logoHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "About Us", id: "about" },
    { name: "Contacts", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu if open
      if (menu) setMenu(false);

      // Smooth scroll to element
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: "smooth",
      });

      // Update active section immediately
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* NAVBAR FOR ALL SCREEN SIZES */}
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate={scrolled ? "scrolled" : "animate"}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/98 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800/80"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100/30 dark:border-gray-800/30"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-24 flex justify-between items-center h-16 md:h-20">
          {/* Fixed logo animation */}
          <motion.div
            variants={logoHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative h-24 w-44 flex items-center"
          >
            {/* Add separate animation for the wiggle effect */}
            <motion.div
              className="w-full h-full"
              whileHover={{
                rotate: [0, -5, 5, 0],
                transition: {
                  type: "keyframes",
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src={Logo}
                alt="logo"
                className="drop-shadow-md transition-all duration-300 object-contain"
                fill
                sizes="(max-width: 768px) (min-width:200px) 100px, 150px"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <motion.p
                  variants={textAnimationVariants}
                  whileHover="hover"
                  className={`cursor-pointer font-semibold transition-colors duration-300 py-1 px-2 ${
                    activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-100"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </motion.p>

                {/* Active indicator with fixed positioning */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 absolute -bottom-1 left-0 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Hover indicator (only visible when not active) */}
                {activeSection !== item.id && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 absolute -bottom-1 left-0"
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <ModeToggle />
            </motion.div>

            <motion.div
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                text={
                  <div className="flex items-center justify-center gap-2 px-1">
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
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                }
                width="w-32"
                height="h-10"
                className="flex items-center justify-center shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <ModeToggle />
            </motion.div>
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-gray-700 dark:text-white focus:outline-none p-2 rounded-full bg-gray-100/70 dark:bg-gray-800/50 backdrop-blur-sm transition-colors duration-300"
              aria-label={menu ? "Close menu" : "Open menu"}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* FULL SCREEN MOBILE MENU - with fixes for scrolling issues */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 dark:bg-gray-900/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center overflow-y-auto pt-20 pb-12"
          >
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md px-6 sm:px-8 py-4 flex flex-col items-center"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={menuItemVariants}
                  className="mb-6 w-full text-center relative"
                  onClick={() => scrollToSection(item.id)}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      color: "var(--color-primary)",
                      transition: { duration: 0.2 },
                    }}
                    className={`cursor-pointer w-full text-xl sm:text-2xl font-semibold py-3 relative overflow-visible ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-100"
                    }`}
                  >
                    <span>{item.name}</span>

                    {/* Active indicator for mobile */}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="mobileActiveIndicator"
                        className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Hover indicator for mobile (only visible when not active) */}
                    {activeSection !== item.id && (
                      <motion.span
                        initial={{ width: 0, opacity: 0, x: "-50%" }}
                        whileHover={{ width: "50%", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                variants={menuItemVariants}
                custom={5}
                className="mt-8 w-full"
              >
                <motion.div
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex justify-center"
                >
                  <Button
                    text={
                      <div className="flex items-center justify-center gap-2 px-1">
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
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    }
                    width="w-full max-w-xs"
                    height="h-12"
                    className="flex items-center justify-center shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;

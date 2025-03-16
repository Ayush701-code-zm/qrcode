"use client";

import { useState, useEffect } from "react";
import { X, Menu, ArrowRight } from "lucide-react";
import Button from "../../components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      transition: { type: "spring", stiffness: 400, damping: 20 }
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
      x: 5,
      transition: { type: "spring", stiffness: 300, damping: 10 }
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
        <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/images/epixelap_logo.png"
              alt="logo"
              width={scrolled ? 50 : 60}
              height={scrolled ? 50 : 60}
              className="drop-shadow-md transition-all duration-300"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "About Us", "Contacts"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden"
              >
                <motion.p
                  variants={textAnimationVariants}
                  whileHover="hover"
                  className="cursor-pointer font-semibold text-gray-700 dark:text-gray-100 transition-colors duration-300"
                >
                  {item}
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 absolute bottom-0 left-0"
                />
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
              className={`${scrolled ? "mr-0" : "mr-0"}`} // Adjust margin if needed
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
                width={scrolled ? "w-32" : "w-32"} // Keep consistent width
                height={scrolled ? "h-10" : "h-10"} // Keep consistent height
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
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
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

      {/* FULL SCREEN MOBILE MENU */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 dark:bg-gray-900/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center"
          >
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md px-8"
            >
              {["Home", "About Us", "Our App", "Contacts"].map((item, i) => (
                <motion.div
                  key={item}
                  custom={i}
                  variants={menuItemVariants}
                  className="mb-8 text-center"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      x: 10,
                      color: "var(--color-primary)",
                      transition: { duration: 0.2 },
                    }}
                    className="cursor-pointer text-2xl font-semibold text-gray-700 dark:text-gray-100 py-3 relative overflow-hidden group"
                  >
                    <span>{item}</span>
                    <motion.span 
                      initial={{ width: 0 }}
                      whileHover={{ width: "50%" }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" 
                    />
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                variants={menuItemVariants}
                custom={5}
                className="mt-12"
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
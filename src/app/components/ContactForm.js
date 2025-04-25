"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import Button from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { motion } from "framer-motion";
import { MessageSquare, CheckCircle, AlertCircle, Loader } from "lucide-react";

function ContactFormSection() {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form validation and submission state
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isSuccess: false,
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isSuccess: false,
      message: "",
    });
    
    try {
      const response = await axios.post('/api/contact', formData);
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isSuccess: true,
        message: response.data.message || "Your message has been sent successfully!",
      });
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isSuccess: false,
        message: error.response?.data?.error || "Failed to send message. Please try again.",
      });
    }
  };

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
    <div id="contact" className="w-full flex justify-center overflow-hidden">
      <motion.section
        className="w-full max-w-[1350px] py-8 md:py-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="flex flex-col items-center" variants={fadeDown}>
          {/* <Header subtitle="We're Here to Help" /> */}
        </motion.div>
        <div className="container mx-auto mt-5">
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
                  src="/images/WhatsApp_contact.jpg"
                  alt="QR code fashion designs"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-full h-full max-h-125 shadow-lg border border-gray-100 dark:border-gray-700"
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

                {/* Status message */}
                {formStatus.isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-md ${
                      formStatus.isSuccess 
                        ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800" 
                        : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {formStatus.isSuccess ? (
                        <CheckCircle size={18} />
                      ) : (
                        <AlertCircle size={18} />
                      )}
                      <span>{formStatus.message}</span>
                    </div>
                  </motion.div>
                )}

                <motion.form
                  onSubmit={handleSubmit}
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className={`p-3 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300 ${
                          errors.name ? "border-red-500 dark:border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={formFieldVariants}>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={`p-3 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300 ${
                          errors.email ? "border-red-500 dark:border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={formFieldVariants}>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="p-3 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your QR code design idea or question"
                        className={`p-3 rounded-md min-h-32 border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-300 ${
                          errors.message ? "border-red-500 dark:border-red-500" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    variants={fadeUp}
                    whileHover={!formStatus.isSubmitting ? {
                      scale: 1.03,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      },
                    } : {}}
                    whileTap={!formStatus.isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <Button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      text={
                        <div className="flex items-center justify-center gap-2">
                          {formStatus.isSubmitting ? (
                            <>
                              <Loader size={18} className="animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <MessageSquare size={18} />
                              <span>Send Message</span>
                            </>
                          )}
                        </div>
                      }
                      className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-500 dark:hover:from-blue-500 dark:hover:to-purple-400 text-white shadow-lg rounded-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
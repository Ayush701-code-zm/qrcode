"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./button";

const Box = ({
  text = "Get Started With Exyntra Risk-free!",
  description = "Exyntra combines data, personalization, and cross-channel experiences to unify analytics, data, and operations—all powered by AI. Register now with a zero-risk free trial.",
}) => {
  const router = useRouter(); // Use Next.js router

  return (
    <div className="relative w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[70vw] mx-auto h-auto py-10 md:py-5 flex flex-col md:flex-row items-center px-5 sm:px-8 md:px-10 bg-gradient-to-b from-[#81bbf911] to-[#4c6e9317] mt-8 sm:mt-10 md:mt-6">
      {/* Orange vertical bar */}
      <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 md:w-5 bg-orange-500"></div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 md:gap-4">
        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-3 w-full md:max-w-[70%] ml-0 md:ml-4 text-center md:text-left pt-2 md:pt-0">
          <p className="font-semibold text-gray-800 text-xl sm:text-2xl md:text-3xl">
            {text}
          </p>

          <p className="font-normal text-gray-600 text-xs sm:text-sm md:text-base px-2 md:px-0">
            {description}
          </p>
        </div>

        {/* Button Section */}
        <div className="w-full md:w-auto flex justify-center md:justify-end mt-6 md:mt-0 mb-2 md:mb-0">
          <Button
            text="Buy Now"
            width="w-full sm:w-40 md:w-35 hover:w-36 transition-all duration-300"
            height="h-12"
            className="flex items-center justify-center gap-2 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
};

export default Box;

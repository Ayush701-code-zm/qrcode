"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import bannerImage from "../../../public/images/banner.jpeg";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full  flex justify-center">
      <div className="w-full  max-w-[1300px] flex justify-center px-4">
        <section className="mt-[50px] w-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-title">
              Express Yourself With Scannable Fashion Designs
            </h1>
            <p className="text-lightBlue text-base max-w-2xl mt-4">
              Create custom QR codes that blend technology with style. Design,
              generate, and print your personalized QR patterns on high-quality
              apparel that's uniquely you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-4 w-full">
            <div className="w-full sm:w-1/2">
              <Button
                text="Design Your QR"
                width="w-full transition-all duration-300"
                height="h-12"
                className="flex items-center justify-center gap-2"
              />
            </div>
          </div>

          <div className="relative hero-image-wrapper h-auto mt-8 mb-5 flex justify-center">
            <div
              ref={imageRef}
              className="hero-image rounded-lg shadow-2xl border overflow-hidden transition-transform duration-300 w-full max-w-[1200px]"
            >
              <Image
                src={bannerImage}
                alt="QR Fashion Showcase"
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;

"use client";

import React from "react";
import Image from "next/image";
import Button from "../../components/ui/button";
import Header from "@/components/commons/Header";

function VideoSection() {
  return (
    <section className="w-full px-4 sm:px-6 py-8 md:py-12 mx-auto flex flex-col items-center">
      <div className="w-full max-w-[1300px]">
        <Header subtitle="Our Design Process" />
        <div className="mt-6 md:mt-9">
          {/* Responsive Flex Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="w-full md:w-1/2 max-w-full md:max-w-[500px] lg:max-w-[600px] flex flex-col">
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#1E0E62] tracking-tight">
                  From Concept to Wearable QR Art
                </h2>
                <p className="text-lightBlue text-sm sm:text-base md:text-base">
                  Our innovative platform makes it simple to design functional
                  QR codes that seamlessly blend with your personal style.
                  Create codes that link to your social profiles, favorite
                  music, portfolio, or any digital content while maintaining
                  your unique aesthetic.
                </p>
                <p className="text-lightBlue text-sm sm:text-base md:text-base">
                  Each design is tested for optimal scanning performance before
                  being printed on premium quality fabrics using eco-friendly
                  processes. Our specialized printing technology ensures your QR
                  code remains scannable even after multiple washes, while
                  preserving the visual appeal of your garment.
                </p>
                <div className="mt-2 sm:mt-4">
                  <Button
                    text="Watch How It Works"
                    className="w-full sm:w-auto h-12 sm:h-14 flex items-center justify-center gap-2 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full md:w-1/2 md:min-w-[300px] flex justify-center mt-8 md:mt-0">
              <div className="relative w-full md:w-[90%] lg:w-full h-auto">
                <Image
                  src="/images/video_player.png"
                  alt="QR Design Process Video"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-full h-auto shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;

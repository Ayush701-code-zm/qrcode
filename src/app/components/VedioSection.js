"use client";

import React from "react";
import Image from "next/image";
import Button from "../../components/ui/button";
import Header from "@/components/commons/Header";
import { Shield, Sparkles, Users } from "lucide-react"; // Import the icons you need

function AboutWithVideoSection() {
  return (
    <section className="w-full px-4 sm:px-6 py-12 md:py-16 mx-auto flex flex-col items-center">
      <div className="w-full max-w-[1300px]">
        {/* Video Section - Now placed above the About Us section */}
        <Header subtitle="Our Design Process" />
        <div className="mt-6 md:mt-9">
          {/* Responsive Flex Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="w-full md:w-1/2 max-w-full md:max-w-[500px] lg:max-w-[600px] flex flex-col">
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#1E0E62] dark:text-indigo-300 tracking-tight">
                  From Concept to Wearable QR Art
                </h2>
                <p className="text-lightBlue dark:text-gray-300 text-sm sm:text-base md:text-base">
                  Our innovative platform makes it simple to design functional
                  QR codes that seamlessly blend with your personal style.
                  Create codes that link to your social profiles, favorite
                  music, portfolio, or any digital content while maintaining
                  your unique aesthetic.
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
                  src="/images/about_img.png"
                  alt="QR Design Process Video"
                  width={400}
                  height={250}
                  className="rounded-lg object-cover w-full h-auto shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section - Now placed below the Video section */}
        <div className="mt-16 md:mt-20">
          <Header subtitle="About QRWear" />

          <div className="mt-8 md:mt-12">
            {/* Startup Story */}
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E0E62] dark:text-indigo-300 tracking-tight mb-4">
                Our Startup Journey
              </h2>
              <p className="text-lightBlue dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl">
                Founded in 2023, QRWear began as a small team with a big vision:
                to bridge the gap between fashion and technology. What started
                in a garage has now grown into an innovative platform
                reimagining how we interact with digital content through
                everyday clothing.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-[#1E0E62] dark:text-indigo-300 mb-3">
                  Our Mission
                </h3>
                <p className="text-lightBlue dark:text-gray-300 text-sm">
                  To democratize personal branding by making wearable technology
                  accessible, sustainable, and stylish for everyone. We believe
                  your clothing should work as hard as you do to tell your
                  unique story.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-[#1E0E62] dark:text-indigo-300 mb-3">
                  Our Vision
                </h3>
                <p className="text-lightBlue dark:text-gray-300 text-sm">
                  A world where personal expression seamlessly integrates with
                  digital connectivity, creating new opportunities for creators,
                  entrepreneurs, and individuals to share their passions and
                  build connections.
                </p>
              </div>
            </div>

            {/* Traction & Growth */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm mb-16">
              <h3 className="text-xl font-bold text-[#1E0E62] dark:text-indigo-300 text-center mb-6">
                Our Journey So Far
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E0E62] dark:text-indigo-300">
                    3,500+
                  </p>
                  <p className="text-sm text-lightBlue dark:text-gray-300">
                    Happy Customers
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E0E62] dark:text-indigo-300">
                    $750K
                  </p>
                  <p className="text-sm text-lightBlue dark:text-gray-300">
                    Seed Funding
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E0E62] dark:text-indigo-300">
                    12
                  </p>
                  <p className="text-sm text-lightBlue dark:text-gray-300">
                    Team Members
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E0E62] dark:text-indigo-300">
                    4
                  </p>
                  <p className="text-sm text-lightBlue dark:text-gray-300">
                    Countries Served
                  </p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-[#1E0E62] dark:text-indigo-300 text-center mb-8">
                Our Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Value 1 */}
                <div className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#F2F6FF] dark:bg-gray-800">
                    <Shield
                      size={32}
                      className="text-[#1E0E62] dark:text-indigo-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E0E62] dark:text-indigo-300 mb-2">
                    Innovation First
                  </h3>
                  <p className="text-center text-lightBlue dark:text-gray-300 text-sm">
                    We embrace challenges as opportunities to create
                    groundbreaking solutions at the intersection of fashion and
                    technology.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#F2F6FF] dark:bg-gray-800">
                    <Sparkles
                      size={32}
                      className="text-[#1E0E62] dark:text-indigo-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E0E62] dark:text-indigo-300 mb-2">
                    Sustainability
                  </h3>
                  <p className="text-center text-lightBlue dark:text-gray-300 text-sm">
                    Environmental responsibility is built into our business
                    model, from eco-friendly materials to carbon-neutral
                    shipping.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#F2F6FF] dark:bg-gray-800">
                    <Users
                      size={32}
                      className="text-[#1E0E62] dark:text-indigo-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E0E62] dark:text-indigo-300 mb-2">
                    Community
                  </h3>
                  <p className="text-center text-lightBlue dark:text-gray-300 text-sm">
                    We're building more than products—we're creating a community
                    of creators, innovators, and trendsetters who share our
                    vision.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-center bg-[#F5F7FF] dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E0E62] dark:text-indigo-300 mb-4 text-center">
                Join us in redefining wearable technology
              </h3>
              <p className="text-lightBlue dark:text-gray-300 text-sm sm:text-base max-w-2xl text-center mb-6">
                We're just getting started on our journey to revolutionize how
                people express themselves through technology-enhanced fashion.
                Be among the first to experience QRWear.
              </p>
              <Button
                text="Start Designing Now"
                className="w-full sm:w-auto h-12 sm:h-14 flex items-center justify-center gap-2 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutWithVideoSection;

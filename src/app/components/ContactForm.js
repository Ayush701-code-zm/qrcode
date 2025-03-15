"use client";

import React from "react";
import Button from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Header from "@/components/commons/Header";

function ContactFormSection() {
  return (
    <section className="w-full py-8 md:py-12">
      <Header title="Service" subtitle="Our Vision & Our Goal" />
      <div className="container mx-auto mt-9">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2">
            <div className="relative h-full min-h-64 md:min-h-96">
              <img
                src="/images/video_player.png"
                alt="Contact us"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Get in Touch
                </h2>
                <p className="text-lightBlue text-base">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="p-3 rounded-md"
                  />

                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="p-3 rounded-md"
                  />

                  <Input
                    type="text"
                    placeholder="Subject"
                    className="p-3 rounded-md"
                  />

                  <Textarea
                    placeholder="Your Message"
                    className="p-3 rounded-md min-h-32"
                  />
                </div>

                <div>
                  <Button
                    text="Get Demo"
                    width="w-full transition-all duration-300"
                    height="h-15"
                    className="flex items-center justify-center gap-2"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;

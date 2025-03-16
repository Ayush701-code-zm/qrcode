"use client";

import React from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Header from "@/components/commons/Header";

function ContactFormSection() {
  return (
    <div className="w-full flex justify-center">
      <section className="w-full max-w-[1350px] py-8 md:py-12 px-4">
        <div className="flex flex-col items-center">
          <Header subtitle="We're Here to Help" />
        </div>
        <div className="container mx-auto mt-9">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <div className="relative h-full min-h-64 md:min-h-96">
                <Image
                  src="/images/video_player.png"
                  alt="QR code fashion designs"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Questions About Custom QR Fashion?
                  </h2>
                  <p className="text-lightBlue text-base">
                    Whether you need help with your QR design, have questions
                    about printing options, or want to discuss a bulk order, our
                    team is ready to assist you.
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
                    {/* 
                    Phone Input Field
                    <PhoneInput
                      country={"us"}
                      inputClass="w-full p-3 rounded-md border border-gray-300"
                    /> */}

                    <Textarea
                      placeholder="Tell us about your QR code design idea or question"
                      className="p-3 rounded-md min-h-32"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      text="Send Message"
                      className="w-full h-12 flex items-center justify-center gap-2 transition-all duration-300"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactFormSection;

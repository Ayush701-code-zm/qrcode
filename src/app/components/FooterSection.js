"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "../../components/ui/separator";

function FooterSection() {
  return (
    <section className="flex flex-col gap-6 w-full mt-20 md:mt-40">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
        {/* Optimized Logo */}
        <Image
          src="/images/footer_logo.png"
          alt="Epixelab Footer Logo"
          width={150} // Adjust based on your design
          height={50} // Adjust based on your design
          className="object-contain"
        />

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
          {["Portfolio", "How it Works", "Pricing", "About", "Login"].map(
            (item) => (
              <button
                key={item}
                className="text-lightBlue text-base hover:underline transition-all"
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      <Separator />

      {/* Footer Text */}
      <div className="pb-8 md:pb-10 text-center">
        <p className="text-lightBlue text-base font-serif">
          © 2020 Epixelab. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default FooterSection;

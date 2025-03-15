"use client";

import React from "react";
import { Separator } from "../../components/ui/separator";

function FooterSection() {
  return (
    <section className="flex flex-col gap-6 w-full mt-20 md:mt-40">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
        <div>
          <img src="/images/footer_logo.png" alt="footer logo" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
          <p className="text-lightBlue text-base">Portfolio</p>
          <p className="text-lightBlue text-base">How it Works</p>
          <p className="text-lightBlue text-base">Pricing</p>
          <p className="text-lightBlue text-base">About</p>
          <p className="text-lightBlue text-base">Login</p>
        </div>
      </div>

      <Separator />

      <div className="pb-8 md:pb-10">
        <div className="text-lightBlue text-base font-serif text-center">
          © 2020 Epixelab. All rights reserved.
        </div>
      </div>
    </section>
  );
}

export default FooterSection;

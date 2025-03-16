import React from "react";
import Header from "../../components/commons/Header";
import { Input } from "../../components/ui/input";
import Button from "../../components/ui/button";

function Newsletter() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="w-full max-w-[1300px] mx-auto">
        <section>
          {/* Centered Header */}
          <div className="text-center">
            <Header subtitle="Subscribe to Our Style Newsletter" />
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-16 mt-6 md:mt-12">
            {/* Image - improved sizing for better display on all screen sizes */}
            <div className="w-full md:w-2/5 flex justify-center mb-6 md:mb-0">
              <img
                src="/images/newsletter_large_icon.png"
                alt="Large envelope"
                className="w-[280px] sm:w-[320px] md:w-[90%] lg:w-full h-auto object-contain"
              />
            </div>

            {/* Text & Form - responsive alignment with reduced text size on medium screens */}
            <div className="w-full md:w-3/5 flex flex-col">
              <p className="mb-6 text-base md:text-sm lg:text-normal font-semibold text-center md:text-left">
                Be the first to discover new QR design trends, limited edition
                patterns, and exclusive tutorials for creating your own custom
                QR codes for apparel. Our weekly newsletter features design
                inspiration, promotional offers, and early access to new
                customization tools. Join our community of fashion-forward tech
                enthusiasts who express their unique style through wearable QR
                designs.
              </p>

              {/* Fully responsive form layout with custom breakpoints */}
              <div className="w-full grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
                <Input
                  type="email"
                  placeholder="Your email address..."
                  className="h-12 sm:h-[3.8125rem] rounded-full newsletter-box-shadow w-full"
                />
                <div className="w-full">
                  <Button
                    text="Subscribe Now"
                    width="w-full"
                    height="h-12 sm:h-[3.8125rem]"
                    className="flex items-center justify-center gap-2 rounded-full transition-all duration-300 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Newsletter;

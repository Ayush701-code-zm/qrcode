import React from "react";
import Header from "../../components/commons/Header";
import { Input } from "../../components/ui/input";
import Button from "../../components/ui/button";

function Newsletter() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1500px] flex justify-center px-4">
        <section className="mt-[50px] w-full">
          <div className="flex flex-col items-center">
            <Header
              title="Our newsletter"
              subtitle="Subscribe Our Newsletter"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center mt-8 md:mt-[3.31rem] w-full">
            <div className="flex justify-center md:justify-start mb-6 md:mb-0 md:w-2/5">
              <img
                src="/images/newsletter_large_icon.png"
                alt="large envelop image"
                className="w-[10rem] md:w-full"
              />
            </div>

            <div className="md:w-3/5 md:pl-8 w-full">
              <p className="mb-[1.44rem] text-normal font-semibold text-center md:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <div className="w-full sm:w-1/2">
                  <Input
                    type="email"
                    placeholder="Your E-mail here..."
                    className="h-[3.8125rem] rounded-[3.0625rem] newsletter-box-shadow w-full"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <Button
                    text="Get Demo"
                    width="w-full transition-all duration-300"
                    height="h-15"
                    className="flex items-center justify-center gap-2"
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

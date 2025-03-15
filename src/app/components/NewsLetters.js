import React from "react";
import Header from "../../components/commons/Header";
import { Input } from "../../components/ui/input";
import { MainButton } from "../../components/ui/button";

function Newsletter() {
  return (
    <section className="mt-[9rem]">
      <Header title="Our newsletter" subtitle="Subscribe Our Newsletter" />
      <div className="flex flex-col md:flex-row items-center mt-8 md:mt-[3.31rem]">
        <div>
          <img
            src="/images/newsletter_large_icon.png"
            alt="large envelop image"
            className="w-[10rem] md:w-full"
          />
        </div>
        <div>
          <p className="mb-[1.44rem] text-normal font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <div className="flex items-center space-x-4 w-full">
            <Input
              type="email"
              placeholder="Your E-mail here..."
              className="h-[3.8125rem] rounded-[3.0625rem] newsletter-box-shadow w-1/2"
            />
            <MainButton
              text="Subscribe Our Newsletter"
              className="h-[3.8125rem] text-white font-bold text-[1rem] rounded-[3.0625rem] w-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;

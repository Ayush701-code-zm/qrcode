import React from "react";
import Button from "../../components/ui/button";
import Header from "@/components/commons/Header";

function VideoSection() {
  return (
    <section className="w-full py-8 md:py-12">
      <Header title="Service" subtitle="Our Vision & Our Goal" />
      <div className="container mx-auto mt-9">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left side - Text Content */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E0E62]">
                Many Blocks and Components
              </h2>
              <p className="text-lightBlue text-base">
                Startup Framework contains components and complex blocks which
                can easily be integrated into almost any design. Our collection
                includes a variety of layouts and pre-built sections that save
                time and improve efficiency during development. Whether you are
                building a corporate website or a personal portfolio, these
                blocks provide the flexibility you need to create beautiful and
                functional websites.
              </p>

              <p className="text-lightBlue text-base">
                With our framework, you can quickly prototype or fully develop
                your project without worrying about building elements from
                scratch. This allows you to focus on the more complex aspects of
                your website while ensuring that all basic components are solid
                and ready for use. Additionally, we provide regular updates to
                the library, keeping everything up to date with the latest
                trends and best practices in web development.
              </p>
              <div className="mt-4">
                <Button
                  text="Get Demo"
                  width="w-full transition-all duration-300"
                  height="h-15"
                  className="flex items-center justify-center gap-2"
                />
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full md:w-1/2">
            <div className="relative h-full min-h-64 md:min-h-96">
              <img
                src="/images/video_player.png"
                alt="Video player"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;

import React from "react";
import { MainButton } from "../../components/ui/button";
import Header from "@/components/commons/Header";

function VideoSection() {
  return (
    <section className="mt-[9rem]">
      <Header title="Service" subtitle="Our Vision & Our Goal" />
      <div className="flex flex-col md:flex-row items-center mt-8 md:mt-[3.31rem]">
        <div>
          <p className="font-['DM_Sans'] font-medium text-[22px] leading-[32px] tracking-[0px] text-[#1E0E62]  py-2 rounded-md">
            Many Blocks and Components
          </p>
          <p className="font-['DM_Sans'] font-normal text-[16px] leading-[26px] tracking-[0px] text-[#15143966] mt-4 mb-8">
            Startup Framework contains components and complex blocks which can
            easily be integrated into almost any design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <MainButton
              text="Explore"
              className="h-[3.01544rem] hover:bg-white w-[8.2925rem] text-[#1E0E62] font-bold text-[1rem] rounded-[6.25rem] border-[4px] border-gray-200 bg-white shadow-none"
            /> */}
            <MainButton
              text="Buy Now"
              className="h-auto w-[18rem] text-white font-bold text-[1rem] rounded-[6.25rem]"
            />
          </div>
        </div>
        <div>
          <img src="/images/video_player.png" alt="video player" />
        </div>
      </div>
    </section>
  );
}

export default VideoSection;

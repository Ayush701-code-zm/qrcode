import React from "react";
// This import assumes your build setup converts SVGs to URLs
import rectangleIcon from "../../../public/icons/Rectangle 7143.svg";
import Image from "next/image";

const Button = ({
  width = "w-auto",
  height = "h-auto",
  text = "Button",
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative group overflow-hidden flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg bg-[#ff6600] transition duration-700 ease-in-out cursor-pointer ${className} ${width} ${height}  `}
      style={{ minWidth: "120px", minWidth: { md: "150px" } }} // Fixed the style object syntax
    >
      {/* Button text with z-index to stay above the animation */}
      <span className="relative z-10 text-center text-[#FFF] font-dm-sans font-semibold text-lg md:text-xl whitespace-nowrap flex-shrink-0">
        {text}
      </span>

      <Image
        src={rectangleIcon}
        alt="Rectangle background"
        layout="fill"
        objectFit="cover" // Maintain aspect ratio while covering parent container
        className="transform translate-x-[-100%] translate-y-[100%] group-hover:translate-x-[100%] group-hover:-translate-y-[100%] transition-transform duration-1000 ease-in-out"
      />
    </div>
  );
};

export default Button;

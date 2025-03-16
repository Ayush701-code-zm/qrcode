"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "../../components/ui/button";
import ModeToggle from "@/components/ModeToggle"; // Importing the dark mode toggle component
import Image from "next/image"; // Importing Next.js's Image component for optimization

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="md:sticky md:top-0 md:shadow-none z-20">
      {/* DESKTOP */}
      <div className="hidden lg:block animate-in fade-in zoom-in bg-white dark:bg-gray-900 p-4">
        <div className="flex justify-between md:mx-[9rem] items-center">
          <div>
            <Image
              src="/images/epixelap_logo.png"
              alt="logo"
              width={100} // Specify width
              height={100} // Specify height
            />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {["Home", "About Us", "Contacts"].map((item) => (
              <p
                key={item}
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray dark:text-white"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-[40px] select-none">
            <ModeToggle /> {/* Dark mode toggle button */}
            <Button
              text="Buy Now"
              width="w-35 hover:w-36 transition-all duration-300"
              height="h-12"
              className="flex items-center justify-center gap-2"
            />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className={`block lg:hidden shadow-sm fixed top-0 w-full z-[999] bg-white dark:bg-gray-900 py-4 animate-in fade-in zoom-in ${
          menu ? " bg-primary py-2" : ""
        }`}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Image
              src="/images/epixelap_logo.png"
              alt="logo"
              width={70} // Adjusted for mobile view
              height={70}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <ModeToggle /> {/* Dark mode toggle button */}
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black dark:text-white"
                onClick={toggleMenu}
                aria-label="Close menu" // Accessibility improvement
              />
            ) : (
              // <Image
              //   src="/icons/hamburger.svg"
              //   alt="menu"
              //   className="cursor-pointer animate-in fade-in zoom-in"
              //   onClick={toggleMenu}
              //   aria-label="Open menu" // Accessibility improvement
              // />
              <Image
                src="/icons/hamburger.svg"
                alt="logo"
                width={35} // Adjusted for mobile view
                height={35}
                onClick={toggleMenu}
                aria-label="Open menu"
              />
            )}
          </div>
        </div>

        {menu && (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              {["Home", "About Us", "Our App", "Contacts"].map((item) => (
                <p
                  key={item}
                  className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray dark:text-white"
                >
                  {item}
                </p>
              ))}

              <div className="flex flex-col gap-[40px] select-none">
                <Button
                  text="Buy Now"
                  width="w-35 hover:w-36 transition-all duration-300"
                  height="h-15"
                  className="flex items-center justify-center gap-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

// components/CustomFont.jsx
import localFont from "next/font/local";

const myCustomFont = localFont({
  src: "../../public/fonts/Megafont.ttf",
  display: "swap",
});

export default function CustomFont({ children }) {
  return <div className={myCustomFont.className}>{children}</div>;
}

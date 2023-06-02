"use client";

import { Inter } from "next/font/google";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <>
      <style jsx global>{`
        html {
          background: url(/images/background.png) no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }

        body {
          color: #fff;
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {children}
    </>
  );
}

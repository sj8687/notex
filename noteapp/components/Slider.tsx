"use client"; // Ensures GSAP runs on the client side

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Slider() {
  

  return (
    <div className="section flex flex-col items-center justify-center mt-[50px] md:mt-[150px] px-6 bg-black text-white text-center">
      <h1 className="text text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
        Your <span className="text-blue-600">Journey</span> Shouldn’t End Here.
      </h1>
      <p className="mt-7 text-base sm:text-lg md:text-xl text-gray-400">
        Follow me on social media to stay tuned on more projects.
      </p>
      <Link
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg ">
          Stay Tuned
        </button>
      </Link>
    </div>
  );
}

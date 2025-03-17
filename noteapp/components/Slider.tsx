"use client"; // Ensures GSAP runs on the client side

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const mm = gsap.matchMedia()

 
export default function Slider() {
  
  useGSAP(()=>{           
    
    mm.add("(min-width:767px)",()=>{
      gsap.to(".text",{
          scale:1.1,
          duration:3,
          color:"white",
          scrollTrigger:{
              trigger:".text",

              scroller:"body",
              start:"top 40%",
              end:"top -20%",
              scrub:1
          },
          
     })
   
  })
            })

  return (
    <div className="text section flex flex-col items-center justify-center mt-[50px] md:mt-[150px] px-6 bg-black text-white text-center">
      <h1 className="text text-3xl sm:text-4xl md:text-6xl font-serif leading-tight">
        Your <span className="text-green-400">Journey</span> Shouldn’t End Here.
      </h1>
      <p className="mt-7 text-base sm:text-lg md:text-xl text-gray-400">
        Follow me on social media to stay tuned on more projects.
      </p>
      <Link
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn mt-6 px-6 py-3 bg-green-400 hover:bg-green-500 text-black text-lg shadow-[0_0_10px_rgba(250,000,100,30)] font-medium rounded-lg ">
          Stay Tuned
        </button>
      </Link>
    </div>
  );
}

"use client"

import { useGSAP } from "@gsap/react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { gsap } from "gsap";
const mm = gsap.matchMedia()


export default function Footer() {

  useGSAP(()=>{           
    
    mm.add("(min-width:767px)",()=>{
      gsap.to(".text",{
          scale:1.1,
          duration:3,
          color:"white",
          scrollTrigger:{
              trigger:".text",

              scroller:"body",
              start:"top 70%",
              end:"top -20%",
              scrub:1
          },
          
     })
   
  })
            })
  return (
    <footer className="bg-black text text-white py-10 px-6 md:ml-[180px] ">
      <div className="max-w-6xl mx-auto grid grid-cols-4  md:mt-[80px]   md:grid-cols-4 gap-8 text-[13px]">
        {/* Column 1 - Company */}
        <div>
          <h2 className="md:text-xl text-[16px] font-bold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 2 - Services */}
        <div>
          <h2 className="md:text-xl text-[16px]  font-bold mb-4">Services</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Web Development</a></li>
            <li><a href="#" className="hover:text-white transition">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-white transition">SEO Optimization</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h2 className=" md:text-xl text-[16px] font-bold mb-4">Resources</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          </ul>
        </div>

        {/* Column 4 - Socials with Icons */}
        <div className="ml-3 md:ml-0">
          <h2 className="md:text-xl text-[16px]  font-bold mb-4">Follow Us</h2>
          <div className="grid grid-cols-1 gap-3 ml-3 md:ml-8">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/__sj__8687"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://instagram.com/__sj__8687"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-2xl"
            >
<FaLinkedin />
</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-8  md:mr-28">
        © {new Date().getFullYear()} NoteX. All rights reserved(Sj).
      </div>
    </footer>
  );
}

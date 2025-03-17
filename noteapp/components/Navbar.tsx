
"use client"
import Link from "next/link";
import { CustomeButton } from "../app/UI/CustomeButton";
import { HiBars3 } from "react-icons/hi2";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger)

export function Navbar(){
     const [isAuthorized, setIsAuthorized] = useState(false); // State for authentication status
     const router = useRouter()
        useEffect(() => {
            async function checkAuth() {
                try {
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`, {
                        withCredentials: true
                    });
    
                    if (res.data) {
                        console.log("User is authorized:", res.data);
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                        router.push("/")
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    setIsAuthorized(false);
                }
            }
    
            checkAuth();
        }, []);

        const t1 = useRef<gsap.core.Timeline | null>(null);
        function handelClick(){
            t1.current?.play();
        }
        function hidediv(){
            t1.current?.reverse()
        }
        
        useEffect(() => {
            if (!t1.current) {
                t1.current = gsap.timeline({ paused: true });
    
                t1.current.to("#mobile-menu", {
                    right: 20,
                    duration: 0.5,
                });
    
                t1.current.from("#mobile-menu-text", {
                    x: "10px",
                    duration: 0.1,
                    opacity: 0,
                    stagger: 0.5,
                });
            }
        }, []);
    
           useGSAP(()=>{
                gsap.from(".logo",{
                    y:-100,
                    duration:2,
                    opacity:0
                })
                gsap.from(".signbarsdiv .sign",{
                    y:-100,
                    duration:2,
                    opacity:0,
                })
                gsap.from(".menus",{
                    y:-100,
                    duration:2,
                    opacity:0,
                })
     
               
                
          
        },[])
    // gsap end
    return (
    <div className=" z-50 bg-transparent rounded-lg backdrop-blur-[10px] max-w-[1152px] mx-auto flex justify-between items-center gap-6 fixed top-0 left-0 right-0 p-3">
                <div className=" px-3 logo">
                    <h1 className="text-xl  text-white">Note<span className="text-green-400 font-bold text-[24px]">X</span></h1>
                </div>
                <div className="text-start  px-2 hidden sm:flex sm:gap-12 text-gray-100 text-[18px]">
                    <Link className="hover:shadow-lg hover:rounded-lg menus" href={"/"}>Home</Link>
                    <Link className="hover:shadow-lg hover:rounded-lg menus" href={"/services"}>Services</Link>
                    <Link className="hover:shadow-lg hover:rounded-lg menus" href={"manual"}>Manual</Link>
                    <Link className="hover:shadow-lg hover:rounded-lg menus" href={"/about"}>About</Link>
                    
                </div>
                
                <div className=" signbarsdiv flex p-1 gap-2 pr-2 text-[18px]">
                    {
                        isAuthorized ? (<Link href={"/login/logout"}><CustomeButton text={"Logout"} textColor=" text-red-600 sign"/></Link>) 
                        :
                         (<Link href={"/login/signup"}><CustomeButton text={"SignUp"} textColor=" text-black sign"/></Link>)  
                    }
                    

                    <div onClick={handelClick} className="w-[50px] text-[30px] text-white sm:hidden flex items-center justify-center cursor-pointer sign">
                            <HiBars3 />
                    </div>
                </div>

                         <div id="mobile-menu" className=" absolute top-12 right-[-90%] bg-black text-white flex flex-col p-3 w-[220px] justify-center items-center gap-4 rounded-lg ">
                                <p onClick={()=>hidediv()} className="absolute top-0 right-0 px-2 rounded mr-5 mt-2 font-medium text-black bg-green-300 cursor-pointer">X</p>
                                <Link id="mobile-menu-text" className="mt-3 rounded-lg outline-none tracking-widest transition-shadow duration-100 hover:shadow-white px-10 " href={"/"}>Home</Link>
                                <Link id="mobile-menu-text" className="tracking-widest rounded-lg transition-shadow duration-100 hover:shadow-white px-10 barsmenus" href={"/services"}>Services</Link>
                                <Link id="mobile-menu-text" className="tracking-widest rounded-lg transition-shadow duration-100 hover:shadow-white px-10 barsmenus" href={"/manuals"}>Manual</Link>
                                <Link id="mobile-menu-text" className="tracking-widest rounded-lg transition-shadow duration-100 hover:shadow-white px-10 barsmenus" href={"/about"}>About</Link>
                            </div>

                    
                    
                
    </div>
    )
}




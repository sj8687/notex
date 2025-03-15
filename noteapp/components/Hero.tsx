"use client"
import Link from "next/link";
import { CustomeButton } from "../app/UI/CustomeButton";
import { useGSAP } from "@gsap/react";
import  {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/context/store";
gsap.registerPlugin(ScrollTrigger)

export function Hero(){
const router = useRouter()
const {authorized} = useMyContext()
    const mm = gsap.matchMedia()
        useGSAP(()=>{           
            // gsap.from("#hero-heading",{
            //     x:"-200px",
            //     opacity:0,
            //     duration:1,
            //     delay:1,
            // })

            
            
            mm.add("(min-width:768px)", () => {
               gsap.to("#hero-heading",{
                    scale:0.8,
                    duration:1,
                    color:"white",
                    scrollTrigger:{
                        trigger:"#hero-heading",
                        scroller:"body",
                        start:"top 10%",
                        end:"top -20%",
                        scrub:1
                    }
               })
               gsap.to("#bouncing",{
                    scale:1.11,
                    duration:1,
                    color:"pink",
                    yoyo:true,
                    repeat:-1
                    
                })
                gsap.from("#hero-heading",{
                    x:"-200px",
                    opacity:0,
                    duration:1,
                    delay:1,
                })

                        
                    gsap.from(".img",{
                        x:"200px",
                        opacity:0,
                        duration:1,
                        delay:1,
                    })

                    gsap.from(".btn",{
                        x:"-200px",
                        opacity:0,
                        duration:1,
                        delay:1,
                    })
            })
            mm.add("(max-width:767px)",()=>{
                gsap.to("#hero-heading",{
                    scale:1.1,
                    duration:3,
                    color:"white",
                    scrollTrigger:{
                        trigger:"#hero-heading",
                        scroller:"body",
                        start:"top 4%",
                        end:"top -20%",
                        scrub:1
                    }
               })
               gsap.to("#bouncing",{
                    scale:1.11,
                    duration:1,
                    color:"pink",
                    yoyo:true,
                    repeat:-1
                    
                })
            })
         
        })

        function gotoDashboard(){
            if(authorized){
                router.push("/dashboard")
            }else{
                router.push("/login/signup");
            }
        }
       
    return (
       <div className=" w-full h-full md:mt-[110px] md:ml-9 ">
        <div className="grid md:grid-cols-2 grid-cols-1  ">
        <div className="text-st md:mt-[50px] mt-[30px] md:ml-[40px]  h-[250px] order-2 md:order-1 ">
            <h1 id="hero-heading"  className="  text-4xl text-wrap  md:text-[50px] leading-[40px] sm:leading-[55px]"> Save Your Notes With Note<span className="text-green-400">X</span> with your trusty site  and secure site connection...</h1>

            <div className="btn flex justify-start md:p-3 mt-7  md:ml-[0px] md:mt-5 " onClick={gotoDashboard}>
            <Link id="bouncing" href={"/dashboard"}><CustomeButton text="Get Started" textSize="md:text-[20px] text-[17px]" width="w-[150px]" textColor="text-black" height=" h-[40px] md:h-[50px]"/></Link>
        </div> 
        </div>
        <div  className="text-center md:ml-[100px] mt-5 img order-1 ">
            <img src="https://cdn-icons-png.flaticon.com/512/9227/9227549.png " width="390px" alt=""  />
        </div>
        </div>
       </div>
    )
}
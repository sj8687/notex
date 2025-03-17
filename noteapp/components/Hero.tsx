"use client"
import Link from "next/link";
import { CustomeButton } from "../app/UI/CustomeButton";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false); // State for authentication status

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
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsAuthorized(false);
            }
        }

        checkAuth();
    }, []); // Run only once on component mount

    function gotoDashboard() {
        if (isAuthorized) {
            router.push("/dashboard");
        } else {
            router.push("/login/signup");
        }
    }

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width:768px)", () => {
            gsap.to("#hero-heading", {
                scale: 0.8,
                duration: 1,
                color: "white",
                scrollTrigger: {
                    trigger: "#hero-heading",
                    scroller: "body",
                    start: "top 10%",
                    end: "top -20%",
                    scrub: 1
                }
            });

            gsap.to("#bouncing", {
                scale: 1.11,
                duration: 1,
                color: "pink",
                yoyo: true,
                repeat: -1
            });

            gsap.from("#hero-heading", {
                x: "-200px",
                opacity: 0,
                duration: 1,
                delay: 1
            });

            gsap.from(".img", {
                x: "200px",
                opacity: 0,
                duration: 1,
                delay: 1
            });

            gsap.from(".btn", {
                x: "-200px",
                opacity: 0,
                duration: 1,
                delay: 1
            });
        });

        mm.add("(max-width:767px)", () => {
            gsap.to("#hero-heading", {
                scale: 1.1,
                duration: 3,
                color: "white",
                scrollTrigger: {
                    trigger: "#hero-heading",
                    scroller: "body",
                    start: "top 4%",
                    end: "top -20%",
                    scrub: 1
                }
            });

            gsap.to("#bouncing", {
                scale: 1.11,
                duration: 1,
                color: "pink",
                yoyo: true,
                repeat: -1
            });
        });
    });

    return (
        <div className="w-full h-full md:mt-[100px] md:ml-9">
            <div className="grid md:grid-cols-2 grid-cols-1  md:mt-20">
                <div  id="hero-heading" className="text-st md:mt-[50px] mt-[30px] md:ml-[40px] h-[250px] ml-9 order-2 md:order-1">
                    <h1 className=" text-wrap md:text-[50px] leading-[45px] sm:leading-[65px] text-4xl 
">
                        Create. Organize. Share. with Note<span className="text-green-400">X.</span> 
                    </h1>
                    <p className="mt-4  text-wrap text-[16px] md:text-[18px] ">
                        A digital workspace that helps you to visulally Organize ideas to map any content to share insperation, to brainstorm, to research....
                    </p>

                    <div className="btn flex justify-start md:p-3 mt-7 md:ml-[0px] md:mt-5" onClick={gotoDashboard}>
                        <Link id="bouncing" href={isAuthorized ? "/dashboard" : "/login/signup"}>
                            <CustomeButton
                                text="Try now"
                                textSize="md:text-[20px] text-[17px]"
                                width="w-[150px]"
                                textColor="text-black"
                                height="h-[40px] md:h-[44px]"
                            />
                        </Link>
                    </div>

                    <p className="mt-3 text-gray-400 ">
                        Notex is free trial-no credit card required-cancel anytime
                    </p>
                </div>

                <div className="text-center md:ml-[100px] mt-0 img order-1">
                    <img src="imgg.jpg" width="400px" alt="Hero Image" />
                </div>
            </div>
        </div>
    );
}

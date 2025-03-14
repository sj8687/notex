"use client"
import { CustomeButton } from "@/app/UI/CustomeButton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

interface signUpResponce{
    message:string
}


export default function Signup() {
  
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef    = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const [data,setData] =useState<signUpResponce | null>(null)
    
 

     const handelClick = useCallback(async()=>{
        if(!emailRef.current?.value && !passwordRef.current?.value){
            toast("email and password require!")
            return
        }
        try {
        
            const response = await axios.post<signUpResponce>(`${process.env.NEXT_PUBLIC_Backend_URL}/user/signup`,
                {
                    username:usernameRef.current?.value || "user",
                    email:emailRef.current?.value,
                    password:passwordRef.current?.value,
                },
                {
                    headers: {
                      "Content-Type": "application/json",
                    },
                }
            );
            if(response.status == 200){
                 toast.success('SignUp success.......', {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                              });
                setData(response.data);
                router.push("/login/signin");
            }
        } catch (error:any) {
           const errors= error.response.data.error.issues?.map((cur:any)=>{
                return cur.message ;
            })
            toast.error(`${errors || error.response.data.error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
       
     },[]);
  


    return (
        <div className=" text-white md:w-[400px] mt-[120px] sm:w-[60%] sm: mx-auto p-2 ">
            <div className="pt-5 border bg-black p-2 rounded-2xl h-[370px] shadow-black shadow-2xl md:px-4">
                <div className="">
                    <h1 className="text-white text-center text-xl sm:text-[23px] md:text-2xl">
                        {"SignUp with"} <span className="underline mr-1">Note</span><span className="underline text-green-400 font-medium">X</span>
                    </h1>
                </div>
                <div className=" mt-2 p-4 flex justify-center flex-col ">
                    
                     <div className="w-full">
                            <label className="block font-semibold" >Username :</label>
                            <input id="username" ref={usernameRef} autoComplete="off"  className="p-1 rounded mb-2 pl-2 w-full text-black" type="text" />
                    </div> 
                    
                    <label className="block font-semibold" >Email :</label>
                    <input ref={emailRef} id="email" autoComplete="off"  className="p-1 rounded mb-2 pl-2 text-black" type="text" />
                    <label className="block font-semibold">Password :</label>
                    <input ref={passwordRef} id="password" autoComplete="off"  className="p-1 rounded pl-2 text-black" type="text" />

                    <p className="mt-4 text-center">{"already have account"} <Link className="ml-[2px] text-purple-400 underline" href={"/login/signin"}>{"Sign In"}</Link></p>
                                                                                                                    
                    <div className={`text-center mt-4`}>
                        <CustomeButton text={"Sign Up"} textColor="text-black hover:shadow-none"
                            textSize="text-[17px]"
                            width="w-[120px]"
                            height="h-[45px]"
                            onClick={handelClick}
                        />
                    </div>
                    <Link href={'/'}><p className="text-center mt-5 border text-[20px] rounded bg-slate-600">close</p></Link>
                </div>
            </div>
        </div>
    )
}
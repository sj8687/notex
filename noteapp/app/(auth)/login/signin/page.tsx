"use client"
import { useMyContext } from "@/app/context/store";
import { CustomeButton } from "@/app/UI/CustomeButton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
interface resultType {
    login?: string;
}

export default function SignIn() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { result, setResult } = useMyContext()

    const handelSignIn = useCallback(async () => {
        if (!emailRef.current?.value && !passwordRef.current?.value) {
            toast("email and password is reqiure")
            return
        }
        try {
            const response = await axios.post<resultType>(`${process.env.NEXT_PUBLIC_Backend_URL}/user/signin`,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials:true,
                }
            )
            if(response.status == 200){
                setResult((prev) => ({ ...prev, login: true }))
                toast.success('SignIn success.......', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }

        } catch (error:any) {
            
            const errors = error.response?.data?.error?.issues?.map((cur: any) => 
                cur.message
              );
            toast.error(`${errors || error.response.data.error }`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }


    }, [])


    useEffect(() => {
        if (result.login == true) {
            router.push("/")
        }

    }, [result.login])

    return (

        <div className=" text-white md:w-[400px] h-full mt-[120px] sm:w-[60%] sm: mx-auto p-2">
            <div className="pt-5 bg-black p-2 rounded-2xl h-[370px] shadow-black shadow-2xl md:px-4 border">
                <div className="">
                    <h1 className="text-white text-center text-xl sm:text-[23px] md:text-2xl">
                        {"SignIn with"} <span className="underline mr-1">Note</span><span className="underline text-green-400 font-medium">X</span>
                    </h1>
                </div>
                <div className=" mt-2 p-4 flex justify-center flex-col">

                    <label className="block font-semibold">Email :</label>
                    <input id="email" ref={emailRef} autoComplete="off" className="p-1 rounded mb-2 pl-2" type="text" />
                    <label className="block font-semibold" >Password :</label>
                    <input id="password" ref={passwordRef} autoComplete="off" className="p-1 rounded pl-2 text-black" type="text" />


                    <div className={`text-center mt-4`}>
                        <CustomeButton text={"Sign In"} textColor="text-black hover:shadow-none"
                            textSize="text-[17px]"
                            width="w-[120px]"
                            height="h-[45px]"
                            onClick={handelSignIn}
                        />
                    </div>
                    <Link href={'/login/signup'}><p className="text-center mt-5 text-[20px] rounded bg-slate-600">close</p></Link>
                    {
                        result.login ? (<div className="w-[20%] text-green-400 bg-black text-center mx-auto mt-6 rounded-xl">{result.login}</div>) : ""
                    }
                </div>
            </div>
        </div>

    )
}
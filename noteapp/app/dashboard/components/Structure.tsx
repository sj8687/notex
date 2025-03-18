"use client"

import { useNotesContext } from "../../context/notesStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MainSkeleton } from "./MainSkeleton"
import axios from "axios"

export function Structure() {
    const {  user } = useNotesContext();
    const router = useRouter()

    const [authorized,setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`, {
                    withCredentials: true
                });

                if (res.data) {
                    console.log("User is authorized:", res.data);
                    setIsAuthorized(true);
                } 
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        }

        checkAuth();
    }, []);
    // mobile
    return (
        <div className="">
            {
                !authorized ? (<div className=""><MainSkeleton/></div>)
                    : (<div className="">
                        
                        <div className="md:hidden   w-[100%] h-auto mt-[80px] ">
                            <h1 className="shadow-xl text-[50px] sm:text-[70px] text-center text-red-100">Welcome <span className="text-green-400">{user}</span> your creation start here..</h1>
                            <div className="w-full h-auto  mt-[0px] px-2 py-7 rounded-t-2xl shadow-xl">
                                <div className="text-white mt-[60px]">
                                    <h2 className="text-3xl pl-4 ml-[94px] ">Create itt✨ </h2>
                                    <div className=" p-2 rounded-sm drop-shadow-md">
                                        {/* <h3 className="pl-9 my-3 underline">Good To Go</h3> */}
                                        <div className=" flex justify-center gap-2 text-black">
                                            <Link className="bg-green-300 rounded-lg  w-[35%] border text-center mt-5 py-2 " href={"/dashboard/create"}>Create</Link>
                                            <Link className="bg-green-300 rounded-lg w-[35%] border text-center mt-5 py-2 " href={"/dashboard/bulk"}>View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                )

            }
        </div>
    )
}
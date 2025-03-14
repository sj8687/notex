"use client"

import { useNotesContext } from "../../context/notesStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { MainSkeleton } from "./MainSkeleton"

export function Structure() {
    const { authorized, user } = useNotesContext();
    const router = useRouter()

    useEffect(() => {
        if (!authorized) {
            router.push("/login/signup")
            return
        }
    }, [authorized]);

    // mobile
    return (
        <div className="">
            {
                !authorized ? (<div className=""><MainSkeleton/></div>)
                    : (<div className="">
                        
                        <div className="md:hidden  w-[100%] mt-[80px] ">
                            <h1 className="shadow-xl text-[50px] sm:text-[70px] text-center text-red-100">Welcome <span className="text-green-400">{user}</span> your creation start here..</h1>
                            <div className="w-full  mt-[0px] px-2 py-7 rounded-t-2xl shadow-xl">
                                <div className="text-white">
                                    <h2 className="text-3xl pl-4 ">Click on it </h2>
                                    <div className=" p-2 rounded-sm drop-shadow-md">
                                        {/* <h3 className="pl-9 my-3 underline">Good To Go</h3> */}
                                        <div className=" flex justify-center gap-2">
                                            <Link className="bg-green-300 rounded-lg w-[35%] border text-center mt-5 py-2 " href={"/dashboard/create"}>Create</Link>
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
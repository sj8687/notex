"use client"
import { useNotesContext } from "@/app/context/notesStore";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

export function TopSection() {
    const { toggle, setToggle } = useNotesContext()
    const [showTooltip, setShowTooltip] = useState(false);

    function handelToggle() {
        setToggle(!toggle)
    }
    // mobile nav bar only
    return (
        <div className="">
            <div className=" w-[85%] mt-3 mx-auto  text-gray-200 md:hidden p-2 z-50 bg-transparent rounded-lg backdrop-blur-[10px] fixed top-0 left-0 right-0 shadow-[0_0_10px_rgba(0,255,205,4)]">
                <div className="flex justify-between px-2">
                <div onClick={handelToggle} className="text-lg relative cursor-pointer"><FaBars /></div>
                    <Link href={"/"}><button>Home</button></Link>
                    <Link href={"/dashboard"}><button>dashboard</button></Link>
                    <div
                      className="text-lg font-extrabold relative cursor-pointer mt-1"
                       onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        >
                      <HiOutlineDotsVertical />
                         {showTooltip && (
                        <div className="absolute right-12 top-0 translate-x-full -translate-y-1/2 bg-gray-800 text-white text-sm px-5 py-1 rounded-lg shadow-md">
                           Chat 
                          </div>
                          )}
                  </div>             
           </div>
                

                <div>
                    {toggle ?
                        <div className="w-[200px] absolute bg-gray-700 text-white -left-[5%] top-[120%] p-2 transition-shadow duration-300 cursor-pointer hover:shadow-black-400 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <div onClick={handelToggle} className="text-2xl cursor-pointer ml-4 mt-2">
                                <p className="bg-black w-[20%] rounded-full flex justify-center text-white">X</p>
                            </div>
                            <div className="py-4 pl-5">
                                <Link href={"/dashboard/create"}>
                                    <p className="items-center rounded-xl pl-2 py-2 mb-1 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200">Create</p>
                                </Link>
                                <p className="items-center rounded-xl pl-2 py-2 mb-1 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200">modify</p>
                                <p className="items-center rounded-xl pl-2 py-2 mb-1 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-200">view</p>

                            </div>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}
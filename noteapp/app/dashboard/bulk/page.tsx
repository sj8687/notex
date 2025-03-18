"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

interface Note {
    id: number;
    title: string;
    description: string;
    noteNo: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export default function Bulk() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);



    async function bulkNotes() {
        try {
            const { data } = await axios.get<Note[]>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/all`,
                {
                    withCredentials: true
                }
            )
            setNotes(data)


        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        bulkNotes()
    }, [])




    return (
        <div className="">
            <div className="mt-[100px] borde p-1">
                {
                    loading ? (
                        <div className="mb-2 md:hidden">
                            <div className="text-white md:w-[300px] mt-10 sm:w-[80%] mx-auto p-2 mb-3">
                                <div className="bg-black/50 p-4 rounded-2xl h-[250px] shadow-black shadow-2xl animate-pulse">

                                    <div className="h-6 w-3/4 bg-gray-700/50 rounded mx-auto mt-4"></div>

                                    <div className="mt-3 flex flex-col space-y-2">
                                        <div className="w-full h-4 bg-gray-700/50 rounded"></div>
                                        <div className="w-5/6 h-4 bg-gray-700/50 rounded mx-auto"></div>
                                    </div>
                                    <br></br>

                                    <div className="h-32 w-full bg-gray-700/50 rounded"></div>
                                </div>
                            </div>
                            <div className="text-white md:w-[300px] mt-10 sm:w-[80%] mx-auto p-2">
                                <div className="bg-black/50 p-4 rounded-2xl h-[250px] shadow-black shadow-2xl animate-pulse">

                                    <div className="h-6 w-3/4 bg-gray-700/50 rounded mx-auto mt-4"></div>

                                    <div className="mt-3 flex flex-col space-y-2">
                                        <div className="w-full h-4 bg-gray-700/50 rounded"></div>
                                        <div className="w-5/6 h-4 bg-gray-700/50 rounded mx-auto"></div>
                                    </div>
                                    <br></br>

                                    <div className="h-32 w-full bg-gray-700/50 rounded"></div>
                                </div>
                            </div>
                        </div>
                    )
                        : notes.length === 0 ? (
                            <div className=" md:hidden text-center text-gray-500 mt-10 text-lg font-semibold">
                                Notes are empty <br />
                                create one
                            </div>
                        )

                            :
// mobile note dislapy
                            (<div className="borde grid gap-2 grid-cols-1  p-1 md:hidden sm:grid-cols-2 sm:justify-between text-white">
                                {
                                    notes?.map((curnotes) => {
                                        const createdlocalDate = new Date(curnotes.createdAt).toLocaleDateString()
                                        const updatedlocalDate = new Date(curnotes.updatedAt).toLocaleDateString()
                                        return (
                                            <div key={curnotes.noteNo} className="border w-full sm:w-[100%] mb-4 bg-slate-1000 p-2 rounded-lg shadow-[0_0_10px_rgba(300,0,0,4)]">

                                                <div className="flex justify-between mb-2 ">
                                                    <h2 className="pl-2 mb-2">Title: <span className="text-md text-justify ">{curnotes.title.length > 40 ? curnotes.title.substring(0, 20) + "..."
                                                        :
                                                        curnotes.title
                                                    }
                                                    </span></h2>
                                                    <div className="flex gap-2 flex-col pr-2 mb-1">
                                                        <p className="text-[10px]">createAt: {createdlocalDate}</p>
                                                        <p className="text-[10px]">updateAt: {updatedlocalDate}</p>
                                                        <hr />
                                                    </div>
                                                </div>
                                                <div className="w-full ">
                                                    <div className="flex justify-end gap-5 pr-2 mb-1">
                                                        <Link className="bg-black px-2 py-1 rounded-lg text-green-400" href={`/dashboard/view?noteNo=${curnotes.noteNo}`}><FaEye /></Link>
                                                        <Link className="bg-black px-2 py-1 rounded-lg text-white" href={`/dashboard/update/${curnotes.noteNo}`}><RxUpdate /></Link>
                                                        <Link className="bg-black px-2 py-1 rounded-lg text-red-500" href={`/dashboard/delete?noteNo=${curnotes.noteNo}`}><MdDelete /></Link>
                                                    </div>
                                                    <hr />
                                                </div>
                                                <p className="mb-2">Description:</p>
                                                <div className="w-[110%] mx-auto h-[150px] p-1 ">
                                                    <p className="line-clamp-4 w-[90%] h-[150px] text-wrap text-justify  overflow-y-scroll   p-4">{curnotes.description}</p>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>)
                }
            </div>
            
        </div>
    )
}
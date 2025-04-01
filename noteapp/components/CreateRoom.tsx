"use client"

import { useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ChatPage() {
  const roomRef = useRef<HTMLInputElement>(null);

  const createRoom = async () => {
    if (!roomRef.current?.value) return toast("Enter a room name");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_Backend_URL}/chat/room/create`,
        { roomname: roomRef.current.value },
        { withCredentials: true }
      );
      toast("Room created successfully");
    } catch (error) {
      toast( "Error creating room");
    }
  };

  const joinRoom = async () => {
    if (!roomRef.current?.value) return toast("Enter a room name");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_Backend_URL}/chat/room/join`,
        { roomname: roomRef.current.value },
        { withCredentials: true }
      );
      toast("Joined room successfully");
    } catch (error) {
      toast("Error joining room");
    }
  };

  return (
    <div className="p-4 bg-black  flex flex-col items-center mt-[220px] md:mt-[240px] border md:w-[500px] md:ml-[480px]">
            <Link href={"/chat"}><button className="text-white md:ml-[400px] ml-[300px]  md:text-[17px] bg-gray-500 p-2 rounded-xl">close</button></Link>

      <h1 className="text-white mb-3">create/join a room</h1>
    <input
      ref={roomRef}
      type="text"
      className="border border-gray-600 bg-gray-900 text-white p-3 w-80 rounded-md mb-4 outline-none"
      placeholder="Enter room name..."
    />
    <button
      onClick={createRoom}
      className="bg-green-500 text-white px-6 py-2 rounded-md w-80 mb-3 hover:bg-green-600 transition"
    >
      Create Room
    </button>
    <button
      onClick={joinRoom}
      className="bg-blue-500 text-white px-6 py-2 rounded-md w-80 hover:bg-blue-600 transition"
    >
      Join Room
    </button>
  </div>
  
  );
}

"use client"

import { FaHome, FaTachometerAlt, FaPlus } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ChatNavbar = () => {
  const router = useRouter();

  return (
    <>
    <nav className="bg-gray-950 border mt-[3px] rounded-sm text-white p-3 flex justify-around shadow-[0_0_10px_rgba(600,700,550,30)]">
    <h1 className="text-white mt-1 text-[20px]">Note<span className="text-green-400 cursor-pointer font-bold text-[25px]"  onClick={() => router.push("/")}>X</span></h1>

      {/* <button
        className="flex flex-col text-green-300 items-center hover:text-green-300"
        onClick={() => router.push("/")}
      >
        <FaHome size={24} />
        <span className="text-sm text-white">Home</span>
      </button> */}

      <button
        className="flex flex-col text-green-300 items-center hover:text-green-300"
        onClick={() => router.push("/dashboard")}
      >
        <FaFilePen size={24} />
        <span className="text-sm text-white">Dashboard</span>
      </button>

      <button
        className="flex flex-col text-green-300 items-center hover:text-green-300"
        onClick={() => router.push("/chat/createrooms")}
      >
        <FaPlus size={24} />
        <span className="text-sm text-white">Create/Join</span>
      </button>
    </nav>
    </>
  );
};

export default ChatNavbar;

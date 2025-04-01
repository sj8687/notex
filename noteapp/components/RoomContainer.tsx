"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { IoSend } from "react-icons/io5";

import axios from "axios";
import Spinner from "./Spinner"
interface Message {
 message: string;
 userId: number;
}

interface ApiResponse {
 userId: string;
 rooms: { roomname: string }[];
}

interface JoinedRoomsResponse {
 rooms: { room?: { roomname?: string }; roomname?: string }[];
}

const ChatAppContainer = () => {
 const mesref = useRef<HTMLDivElement | null>(null);
 const messageRef = useRef<HTMLInputElement>(null);
 const ws = useRef<WebSocket | null>(null);

 const [userid, setUserid] = useState<number>(0);
 const [rooms, setRooms] = useState<string[]>([]);
 const [currentRoom, setCurrentRoom] = useState<string>("");
 const [messages, setMessages] = useState<Message[]>([]);
 const [joinroom, setJoinroom] = useState<string[]>([]);

 // Loading states
 const [loadingRooms, setLoadingRooms] = useState<boolean>(false);
 const [loadingJoinedRooms, setLoadingJoinedRooms] = useState<boolean>(false);
 const [loadingChat, setLoadingChat] = useState<boolean>(false);

 // Fetch available (created) rooms
 useEffect(() => {
   const controller = new AbortController();
   const fetchRooms = async () => {
     setLoadingRooms(true);
     try {
       const res = await axios.get<ApiResponse>(
         `${process.env.NEXT_PUBLIC_Backend_URL}/chat/room/getall`,
         { withCredentials: true, signal: controller.signal } as any
       );
       setUserid(parseInt(res.data.userId, 10));
       setRooms(res.data.rooms.map((room) => room.roomname));
       
     } catch (error:any) {
        if (error.name === "CanceledError") {
            console.log("Request was canceled:", error.message);
          } else {
            console.error("Error fetching rooms:", error);
          }
       } finally {
       setLoadingRooms(false);
     }
   };

   fetchRooms();
   return () => controller.abort();
 }, []);


 
 // Fetch joined rooms
 useEffect(() => {
   const controller = new AbortController();
   const fetchJoinedRooms = async () => {
     setLoadingJoinedRooms(true);
     try {
       const res = await axios.get<JoinedRoomsResponse>(
         `${process.env.NEXT_PUBLIC_Backend_URL}/chat/joinrooms`,
         { withCredentials: true, signal: controller.signal } as any
       );
       setJoinroom(
         res.data.rooms
           .map((room) => room.room?.roomname ?? room.roomname)
           .filter((roomname): roomname is string => typeof roomname === "string")
       );
     } catch (error:any ) {
        if (error.name === "CanceledError") {
            console.log("Request was canceled:", error.message);
          } else {
            console.error("Error fetching rooms:", error);
          }
  
     } finally {
       setLoadingJoinedRooms(false);
     }
   };

   fetchJoinedRooms();
   return () => controller.abort();
 }, []);



 // Fetch messages for the selected room
 useEffect(() => {
   if (!currentRoom) return;

   setLoadingChat(true);
   const controller = new AbortController();
   const fetchMessages = async () => {
     try {
       const res = await axios.post<{ messages: Message[] }>(
         `${process.env.NEXT_PUBLIC_Backend_URL}/chat/room/messages`,
         { roomname: currentRoom },
         { withCredentials: true, signal: controller.signal } as any
       );
       setMessages(res.data.messages || []);
     } catch (error:any) {
        if (error.name === "CanceledError") {
            console.log("Request was canceled:", error.message);
          } else {
            console.error("Error fetching rooms:", error);
          }
       } finally {
       setLoadingChat(false);
     }
   };

   fetchMessages();
   return () => controller.abort();
 }, [currentRoom]);

 // Auto-scroll to the latest message
 useEffect(() => {
   mesref.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages]);

 // Function to connect to a room (join or create)
 const connectToRoom = useCallback(
   (roomname: string, isJoining: boolean = false) => {
     if (currentRoom === roomname) return;

     // Close any existing WebSocket connection
     if (ws.current) {
      ws.current.onclose = null; // Remove previous event listeners
      ws.current.close();
    }

     ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_Chat_Backend_URL}`);

     ws.current = ws.current;

     ws.current.onopen = () => {
       ws.current?.send(
         JSON.stringify({
           type: isJoining ? "join" : "create",
           payload: { roomname },
         })
       );
       setCurrentRoom(roomname);
       setMessages([]);
     };

     ws.current.onmessage = (message) => {
       const parsedmessage = JSON.parse(message.data);
       if (parsedmessage.type === "chat") {
         setMessages((prev) => [...prev, parsedmessage.payload]);
       }
     };

     ws.current.onclose = () => {
       console.log("Disconnected from room:", roomname);
     };
   },
   [currentRoom]
 );

 

 // Function to send a message & store in DB
 const sendMessage = useCallback(async () => {
   if (!ws.current || !currentRoom || !messageRef.current?.value) return;

   const newMessage = {
     roomname: currentRoom,
     message: messageRef.current.value,
     userId: userid,
   };

   try {
     await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/chat/messages`, newMessage, {
       withCredentials: true,
     });
     ws.current.send(
       JSON.stringify({
         type: "chat",
         payload: { message: newMessage.message, userId: newMessage.userId },
       })
     );
   } catch (error) {
     console.error("Error saving message:", error);
   }

   messageRef.current.value = "";
 }, [currentRoom, userid]);

 // Cleanup WebSocket connection on unmount
 useEffect(() => {
  return () => {
    if (ws.current) {
      ws.current.onclose = null; // Remove listeners before closing
      ws.current.close();
    }
  };
}, []);


 return (
   <div className="flex mt-1 h-[690px] bg-black text-white">
     <div className="md:w-1/4 w-[70px] bg-gray-900 p-2 md:p-4 border-r  hideScroll overflow-y-auto  border-gray-700">
       <h2 className="md:text-lg text-[15px] font-bold mb-4">Rooms</h2>
       <p className="text-gray-400 mb-2">Created room's</p>

       {/* Available Rooms */}
       {loadingRooms ? (
         <div className="w-full flex justify-center items-center py-2">
           <Spinner  />
         </div>
       ) : (
         <div className="space-y-2">
           {rooms.map((room, index) => (
             <div
               key={index}
               onClick={() => connectToRoom(room)}
               className={`md:p-3  p-2 rounded-md text-[12px] md:text-[17px] cursor-pointer ${
                 currentRoom === room
                   ? "bg-blue-600"
                   : "bg-gray-800 hover:bg-gray-700"
               }`}
             >
               {room}
             </div>
           ))}
         </div>
       )}

       {/* Joined Rooms */}
       <div className="mt-8">
         <h1 className="md:text-lg text-[15px] text-gray-400 mb-2">Joined Rooms</h1>
         {loadingJoinedRooms ? (
           <div className="w-full flex justify-center  items-center py-2">
             <Spinner  />
           </div>
         ) : (
           <div className="space-y-2">
             {joinroom.map((room, index) => (
               <div
                 key={index}
                 onClick={() => connectToRoom(room, true)}
                 className={`md:p-3 p-2 rounded-md text-[12px] md:text-[17px] cursor-pointer ${
                   currentRoom === room
                     ? "bg-blue-600"
                     : "bg-gray-800 hover:bg-gray-700"
                 }`}
               >
                 {room}
               </div>
             ))}
           </div>
         )}
       </div>
     </div>

     {/* Chat Area */}
     <div className="w-[90%] sm:w-[1200px] flex flex-col">
       <div className="p-4 bg-gray-800 text-lg font-bold">
         {currentRoom || "Select a Room"}
       </div>

       <div className="flex-1 hideScroll overflow-y-auto p-4 space-y-3 bg-gray-950">
         {loadingChat ? (
           <div className="w-full flex mt-[80px] justify-center items-center py-10">
             <Spinner />
           </div>
         ) : currentRoom ? (
           messages.length > 0 ? (
             messages.map((msg, index) => (
               <div
                 key={index}
                 className={`p-2 flex ${
                   msg.userId === userid ? "justify-end" : "justify-start"
                 }`}
               >
                 <p
                   className={`border text-[14px] md:text-[17px] p-2 max-w-[70%] rounded-lg ${
                     msg.userId === userid
                       ? "bg-green-400 text-black"
                       : "bg-gray-300 text-black"
                   }`}
                 >
                   {msg.message}
                 </p>
               </div>
             ))
           ) : (
             <p className="text-gray-400 text-center mt-10">
               No messages yet. Start the conversation!
             </p>
           )
         ) : (
           <p className="text-gray-400 text-center mt-10">
             Select a room from the left panel to start chatting!
           </p>
         )}
         <div ref={mesref}></div>
       </div>

       {currentRoom && (
         <div className="p-4 bg-gray-800 flex">
           <input
             ref={messageRef}
             type="text"
             className="flex-1 p-2 rounded-md bg-gray-900 text-white outline-none"
             placeholder="Type a message..."
           />
           <button
             onClick={sendMessage}
             className="ml-2 text-black bg-green-400 px-4 py-2 rounded-md hover:bg-green-500"
           >
             <IoSend />

           </button>
         </div>
       )}
     </div>
   </div>
 );
};

export default ChatAppContainer;

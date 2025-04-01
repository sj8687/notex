import express, { Response,Request, Router } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import { tokenMiddleware } from "../middlewares/tokenMiddeleware";
import { RoomSchema } from "../zodTypes/types";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300 }); // Cache expires in 5 minutes

export const chatRoute = Router();


chatRoute.post("/room/create",tokenMiddleware,async (req:Request,res:Response)=>{
    try {
        const parseData = RoomSchema.safeParse(req.body)
        if (!parseData.success) {
            res.status(400).json({
                error:"not valid input"
            })
            return
        }

            const roomname = parseData.data.roomname;
            const userId = req.userid!;

            const existingRoom = await client.room.findUnique({
                where:{
                    roomname
                }
            })

            if (existingRoom) {
                 res.json({
                    message:"room already exist"
                })
                return
            }

            const newRoom = await client.room.create({
                      data: {
                        roomname,
                        userId ,
                      },
                    });

             // Invalidate the cache after room creation
             cache.del(`rooms_${req.userid}`);

                
                    res.status(201).json({ 
                        message: "Room created successfully", 
                        room: newRoom 
                    });
    } catch (error) {
        res.json({
            "error":"something wrong in server"
        })
    }
})


chatRoute.post("/room/join", tokenMiddleware, async (req, res ) => {
  try {
    const { roomname } = req.body;
    const userId = req.userid!; 

    const room = await client.room.findUnique({ 
        where: { roomname }
     });

    if (!room) {
       res.status(404).json({ 
        message: "Room not found" 
    });
       return
    }

    const existingMember = await client.member.findFirst({
        where: { 
            roomId: room.id, userId
         }
      });
  
      if (existingMember) {
         res.status(400).json({ 
            message: "User is already in this room"
         });
         return
      }
  
      await client.member.create({
        data: {
          userId,
          roomId: room.id
        }
      });

      // if new request delete casche
      cache.del(`joinrooms_${userId}`)

      res.status(200).json({
         message: "Joined room successfully", roomId: room.id 
        });
  } catch (error) {

    console.error("Error joining room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


chatRoute.get("/room/getall", tokenMiddleware, async (req, res) => {
    try {
        const userId = req.userid;

        // Check if cached data exists for this user
        const cachedRooms = cache.get(`rooms_${userId}`);
        if (cachedRooms) {
             res.status(200).json({
                rooms: cachedRooms,
                userId
            });
            return
        }

        // Fetch from database if not cached
        const rooms = await client.room.findMany({
            where: { userId }
        });

        // Store result in cache
        cache.set(`rooms_${userId}`, rooms);

        res.status(200).json({
            rooms,
            userId
        });

    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



chatRoute.get("/joinrooms",tokenMiddleware,async(req,res)=>{

   // Check if cached data exists

  const userid = req.userid;
  const cachedrooms = cache.get(`joinroom_${userid}`)

  if (cachedrooms) {
    console.log("join");

    res.json({
      rooms:cachedrooms,
      userid
    })
    return    
  }

  // if not then db call
  const rooms = await client.member.findMany({
    where: { userId:req.userid },
    select: {
      room: {
        select: {
          id: true,
          roomname: true,
        },
      },
    }
  });


  cache.set(`joinroom_${userid}`, rooms)

  res.json({
    rooms,
    userid:req.userid
  })

})



chatRoute.post("/messages", async (req, res) => {
  try {
    const { roomname, message, userId } = req.body;

    if (!roomname || !message || !userId) {
       res.status(400).json({ error: "Room name, message, and userId are required" });
       return
    }

    // Find the room by roomname
    const room = await client.room.findUnique({
      where: { roomname },
    });

    if (!room) {
       res.status(404).json({ error: "Room not found" });
       return
    }

    // Store the message
    const newMessage = await client.chat.create({
      data: {
        roomId: room.id,
        message,
        userId,
      },
    });

    res.status(201).json({ message: "Message saved successfully", newMessage });
    
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// get msg but we do as post
chatRoute.post("/room/messages", tokenMiddleware, async (req, res) => {
    try {
      const parseData = RoomSchema.safeParse(req.body)
      if (!parseData.success) {
          res.status(400).json({
              error:"not valid input"
          })
          return
      }
  
      const {roomname} = parseData.data

      if (!roomname) {
         res.status(400).json({
             message: "Room name is required"
             });
             return
      }
    
      const room = await client.room.findUnique({
        where: { roomname },
      });
  
      if (!room) {
         res.status(404).json({
             message: "Room not found" 
            });
            return
      }
  
      const messages = await client.chat.findMany({
        where: { 
            roomId: room.id
         },
      });
  
      res.status(200).json({ 
         messages
     });

    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});
  


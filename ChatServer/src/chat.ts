import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: Number(process.env.PORT) || 7070 });


interface User {
    socket:WebSocket;
    roomname:string;
}

const allSockets:User[]=[];

wss.on("connection",(socket) => {
    try {
        console.log("user connect");
        
        socket.on("message",async(message)=>{
            const parsemessage = JSON.parse(message.toString())

            if (parsemessage.type == "create") {
                const roomExist = allSockets.find(user => user.roomname == parsemessage.payload.roomname)
                if (!roomExist) {
                    allSockets.push({
                        socket,
                        roomname:parsemessage.payload.roomname
                    })
                    console.log("crete");
                    
                }
                else{
                    socket.send(JSON.stringify({
                        type:"error",
                        message:"room already exist in DB"
                    }))
                }
            }

            if (parsemessage.type == "join") {
                const roomExist = allSockets.find(user => user.roomname == parsemessage.payload.roomname)
               
                    allSockets.push({
                        socket,
                        roomname:parsemessage.payload.roomname
                    })
                    console.log("join");

                
                    // socket.send(JSON.stringify({
                    //     type:"error",
                    //     message:"room not exist in "
                    // }))
                
            }

            if (parsemessage.type == "chat") {
                const user = allSockets.find((x)=>x.socket == socket)!;

                if (user) {
                    for(let i=0; i <allSockets.length; i++){
                        if (allSockets[i].roomname == user.roomname) {
                            allSockets[i].socket.send(JSON.stringify({
                                type:"chat",
                                payload:{

                                    message:parsemessage.payload.message,
                                    userId:Number(parsemessage.payload.userId)
                                }
                            }))
                        }
                    }
                    console.log("chat");
                }
                  
                
            }
        })
    } catch (error) {
        console.log(error);
        socket.on("close",()=>{
            console.log("we fucked up");
            
        })
    }
})
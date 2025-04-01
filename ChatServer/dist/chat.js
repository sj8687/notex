"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: Number(process.env.PORT) || 7070 });
const allSockets = [];
wss.on("connection", (socket) => {
    try {
        console.log("user connect");
        socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
            const parsemessage = JSON.parse(message.toString());
            if (parsemessage.type == "create") {
                const roomExist = allSockets.find(user => user.roomname == parsemessage.payload.roomname);
                if (!roomExist) {
                    allSockets.push({
                        socket,
                        roomname: parsemessage.payload.roomname
                    });
                    console.log("crete");
                }
                else {
                    socket.send(JSON.stringify({
                        type: "error",
                        message: "room already exist in DB"
                    }));
                }
            }
            if (parsemessage.type == "join") {
                const roomExist = allSockets.find(user => user.roomname == parsemessage.payload.roomname);
                allSockets.push({
                    socket,
                    roomname: parsemessage.payload.roomname
                });
                console.log("join");
                // socket.send(JSON.stringify({
                //     type:"error",
                //     message:"room not exist in "
                // }))
            }
            if (parsemessage.type == "chat") {
                const user = allSockets.find((x) => x.socket == socket);
                if (user) {
                    for (let i = 0; i < allSockets.length; i++) {
                        if (allSockets[i].roomname == user.roomname) {
                            allSockets[i].socket.send(JSON.stringify({
                                type: "chat",
                                payload: {
                                    message: parsemessage.payload.message,
                                    userId: Number(parsemessage.payload.userId)
                                }
                            }));
                        }
                    }
                    console.log("chat");
                }
            }
        }));
    }
    catch (error) {
        console.log(error);
        socket.on("close", () => {
            console.log("we fucked up");
        });
    }
});

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoute = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const tokenMiddeleware_1 = require("../middlewares/tokenMiddeleware");
const types_1 = require("../zodTypes/types");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 300 }); // Cache expires in 5 minutes
exports.chatRoute = (0, express_1.Router)();
exports.chatRoute.post("/room/create", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseData = types_1.RoomSchema.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                error: "not valid input"
            });
            return;
        }
        const roomname = parseData.data.roomname;
        const userId = req.userid;
        const existingRoom = yield client.room.findUnique({
            where: {
                roomname
            }
        });
        if (existingRoom) {
            res.json({
                message: "room already exist"
            });
            return;
        }
        const newRoom = yield client.room.create({
            data: {
                roomname,
                userId,
            },
        });
        // Invalidate the cache after room creation
        cache.del(`rooms_${req.userid}`);
        res.status(201).json({
            message: "Room created successfully",
            room: newRoom
        });
    }
    catch (error) {
        res.json({
            "error": "something wrong in server"
        });
    }
}));
exports.chatRoute.post("/room/join", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomname } = req.body;
        const userId = req.userid;
        const room = yield client.room.findUnique({
            where: { roomname }
        });
        if (!room) {
            res.status(404).json({
                message: "Room not found"
            });
            return;
        }
        const existingMember = yield client.member.findFirst({
            where: {
                roomId: room.id, userId
            }
        });
        if (existingMember) {
            res.status(400).json({
                message: "User is already in this room"
            });
            return;
        }
        yield client.member.create({
            data: {
                userId,
                roomId: room.id
            }
        });
        // if new request delete casche
        cache.del(`joinrooms_${userId}`);
        res.status(200).json({
            message: "Joined room successfully", roomId: room.id
        });
    }
    catch (error) {
        console.error("Error joining room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.chatRoute.get("/room/getall", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userid;
        // Check if cached data exists for this user
        const cachedRooms = cache.get(`rooms_${userId}`);
        if (cachedRooms) {
            res.status(200).json({
                rooms: cachedRooms,
                userId
            });
            return;
        }
        // Fetch from database if not cached
        const rooms = yield client.room.findMany({
            where: { userId }
        });
        // Store result in cache
        cache.set(`rooms_${userId}`, rooms);
        res.status(200).json({
            rooms,
            userId
        });
    }
    catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.chatRoute.get("/joinrooms", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if cached data exists
    const userid = req.userid;
    const cachedrooms = cache.get(`joinroom_${userid}`);
    if (cachedrooms) {
        console.log("join");
        res.json({
            rooms: cachedrooms,
            userid
        });
        return;
    }
    // if not then db call
    const rooms = yield client.member.findMany({
        where: { userId: req.userid },
        select: {
            room: {
                select: {
                    id: true,
                    roomname: true,
                },
            },
        }
    });
    cache.set(`joinroom_${userid}`, rooms);
    res.json({
        rooms,
        userid: req.userid
    });
}));
exports.chatRoute.post("/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomname, message, userId } = req.body;
        if (!roomname || !message || !userId) {
            res.status(400).json({ error: "Room name, message, and userId are required" });
            return;
        }
        // Find the room by roomname
        const room = yield client.room.findUnique({
            where: { roomname },
        });
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }
        // Store the message
        const newMessage = yield client.chat.create({
            data: {
                roomId: room.id,
                message,
                userId,
            },
        });
        res.status(201).json({ message: "Message saved successfully", newMessage });
    }
    catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// get msg but we do as post
exports.chatRoute.post("/room/messages", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseData = types_1.RoomSchema.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                error: "not valid input"
            });
            return;
        }
        const { roomname } = parseData.data;
        if (!roomname) {
            res.status(400).json({
                message: "Room name is required"
            });
            return;
        }
        const room = yield client.room.findUnique({
            where: { roomname },
        });
        if (!room) {
            res.status(404).json({
                message: "Room not found"
            });
            return;
        }
        const messages = yield client.chat.findMany({
            where: {
                roomId: room.id
            },
        });
        res.status(200).json({
            messages
        });
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

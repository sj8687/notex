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
exports.contactRoutes = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
exports.contactRoutes = (0, express_1.Router)();
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
exports.contactRoutes.post("/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        res.status(400).json({ error: "All fields are required." });
    try {
        yield axios_1.default.post(DISCORD_WEBHOOK_URL, {
            content: `📩 **New Contact Message**\n\n👤 **Name:** ${name}\n📧 **Email:** ${email}\n💬 **Message:** ${message}`,
        });
        res.status(200).json({ success: "Message sent to Discord!" });
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
}));

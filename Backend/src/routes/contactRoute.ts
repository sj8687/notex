import { Router, Request, Response } from "express";
import axios from "axios";

export const contactRoutes = Router();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

contactRoutes.post("/contact", async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) res.status(400).json({ error: "All fields are required." });
      
    try {
        await axios.post(DISCORD_WEBHOOK_URL, {
          content: `📩 **New Contact Message**\n\n👤 **Name:** ${name}\n📧 **Email:** ${email}\n💬 **Message:** ${message}`,
        });

        res.status(200).json({ success: "Message sent to Discord!" });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Something went wrong." });
      }
});

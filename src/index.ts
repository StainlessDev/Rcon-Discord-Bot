import { BotClient } from "@structures/client";
import dotenv from "dotenv";
dotenv.config();


export const client = new BotClient();

if (process.env.TOKEN === undefined) {
    throw new Error("Token is not defined");
}

client.start(process.env.TOKEN);
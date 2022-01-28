import { Client, Intents } from "discord.js";
import { BOT_TOKEN, MONGO_URI } from "./config";
import { handleMessage } from "./controllers";
import { connectToDB } from "./utils/mongo.util";

// URL -> https://discord.com/api/oauth2/authorize?client_id=936613122024812545&permissions=268503072&scope=bot

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ["CHANNEL", "MESSAGE"],
});

bot.login(BOT_TOKEN);
bot.on("messageCreate", handleMessage);

connectToDB(MONGO_URI);

bot.on("ready", () => {
  console.log("--> Bot is online ");
});

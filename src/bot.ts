import { Client, Intents } from "discord.js";
import { BOT_TOKEN } from "./config";

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

bot.login(BOT_TOKEN);

bot.on("ready", () => {
  console.log("--> Bot is online ");
});

import discord from "discord.js";
import { CONNECT_TRIGGER } from "../constants/triggers";
import { connectController } from "./connection.controller";

export const handleMessage = async (
  message: discord.Message
): Promise<void> => {
  const msg = message.content;
  const trigger = msg.split(" ")[0];

  switch (trigger) {
    case CONNECT_TRIGGER:
      return connectController(message);
  }
};

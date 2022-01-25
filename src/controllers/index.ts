import discord from "discord.js";
import {
  CONNECT_TRIGGER,
  DONE_TRIGGER,
  HELP_TRIGGER,
} from "../constants/triggers";
import {
  confirmConnectionTrigger,
  connectController,
  helpController,
} from "./connection.controller";

export const handleMessage = async (
  message: discord.Message
): Promise<void> => {
  const msg = message.content;
  const trigger = msg.split(" ")[0];

  switch (trigger) {
    case CONNECT_TRIGGER:
      return connectController(message);
    case DONE_TRIGGER:
      return confirmConnectionTrigger(message);
    case HELP_TRIGGER:
      return helpController(message);
  }
};

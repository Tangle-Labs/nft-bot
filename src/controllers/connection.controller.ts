import discord from "discord.js";
import { DONE_TRIGGER } from "../constants/triggers";

export const connectController = async (
  message: discord.Message
): Promise<void> => {
  const embed = new discord.MessageEmbed()
    .setTitle("Connect Wallet")
    .setDescription(
      `To connect your please go to https://nft.tanglelabs.io/profile and click on the connect discord button
      once you have done that reply with \`${DONE_TRIGGER}\``
    )
    .setColor("GREEN");

  message.author.send({ embeds: [embed] });
};

export const confirmConnectionTrigger = async (
  message: discord.Message
): Promise<void> => {};

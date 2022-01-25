import discord, { Client, Message, MessageEmbed } from "discord.js";
import axios from "axios";
import { DONE_TRIGGER } from "../constants/triggers";
import { User } from "../models/user.model";
import {
  BLUE_ROLE,
  DISCORD_SERVER,
  GOLD_ROLE,
  PURPLE_ROLE,
  RED_ROLE,
} from "../config";

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
): Promise<void> => {
  const user = await User.findOne({ discordId: message.author.id });
  if (!user) return;
  const { nfts } = user;

  const colors = {
    gold: 4,
    purple: 3,
    red: 2,
    blue: 1,
  };

  const NFTs = await Promise.all(
    nfts.map(async (nft) => {
      const NFT = await axios.get(nft, {
        headers: { "Content-Type": "application/json" },
      });
      return NFT.data;
    })
  );

  if (NFTs.length === 0) return;

  let currHighest = 0;
  let currBestColor;
  for (const nft of NFTs) {
    const color = nft.attributes
      .find((a: any) => a.trait_type === "Color")
      .trait_value.toLowerCase();
    // @ts-ignore
    if (colors[color] > currHighest) {
      currBestColor = color;
    }
  }
  const guild = await message.client.guilds.fetch(DISCORD_SERVER);
  const member = await guild.members.fetch(message.author.id);

  const roles = {
    gold: GOLD_ROLE,
    purple: PURPLE_ROLE,
    red: RED_ROLE,
    blue: BLUE_ROLE,
  };

  // @ts-ignore
  member.roles.add(roles[currBestColor]);

  const embed = new MessageEmbed()
    .setTitle("Done!")
    .setDescription("Your roles have been added!")
    .setColor("GREEN");

  message.author.send({ embeds: [embed] });
};

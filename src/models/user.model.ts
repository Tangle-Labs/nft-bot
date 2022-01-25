import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    metamaskAddr: {
      type: String,
      required: true,
      validate: /^0x[a-fA-F0-9]{40}$/,
      unique: true,
    },
    nfts: {
      type: [{ type: String, unique: true }],
      default: [],
    },
    mintedNfts: {
      type: [{ type: String, unique: true }],
      default: [],
    },
    iotaAddr: {
      type: String,
      required: true,
      unique: true,
      validate: /^(iota1|atoi1)[0-9a-z]{59}$/,
    },
    fireflyWallet: {
      type: String,
      validate: /^(iota1|atoi1)[0-9a-z]{59}$/,
    },
    discord: {
      type: String,
      validate: /^.{3,32}#[0-9]{4}$/,
    },
    discordId: {
      type: String,
    },
    previousAddress: {
      type: String,
    },
    previousAddresses: {
      type: [{ type: String, validate: /^(iota1|atoi1)[0-9a-z]{59}$/ }],
    },
    latestNft: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

interface IUserType {
  metamaskAddr: string;
  iotaAddr: string;
  fireflyWallet: string;
  discord: string;
  discordId: string;
  nfts: string[];
  mintedNfts: string[];
  previousAddresses: string[];
  previousAddress: string;
  latestNft: number;
}

export interface IUserDocument extends mongoose.Document, IUserType {}

export const User = mongoose.model<IUserDocument>("User", UserSchema);

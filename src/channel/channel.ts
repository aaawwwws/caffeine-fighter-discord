import { Client } from "discord.js";

export interface Channel {
  create(): Promise<void>;
}

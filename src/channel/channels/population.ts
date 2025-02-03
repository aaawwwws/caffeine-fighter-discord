import { Client, Guild, GuildManager, GuildMFALevel } from "discord.js";
import { Channel } from "../channel";

export class Population implements Channel {
  constructor(private readonly client: Client) {}
  public async create(): Promise<void> {
    const channel = this.client.guilds.cache.get(process.env.SERVER_ID!)!;
    const role = channel.roles.cache.find((r) => r.name === "MEMBER");
    const membersWithRole = (await channel.members.fetch()).filter((member) =>
      member.roles.cache.has(role!.id)
    );
    console.log("中身");
    await channel.channels.cache
      .get(process.env.POPULATION!)
      ?.setName(`参加人数:${membersWithRole.size}人`);
    console.log(membersWithRole.size);
  }
}

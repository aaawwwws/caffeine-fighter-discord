import { TextChannel } from "discord.js";
import { PlayerList } from "./playerList";
import { Player } from "./player";
import { ServerList } from "../serverList/serverList";

export class PlayerFetch {
  constructor() {}
  public async fetch(channel: TextChannel): Promise<PlayerList> {
    const message = await channel.messages.fetch({ limit: 100 });
    const sortedMessages = message.sort(
      (a, b) => a.createdTimestamp - b.createdTimestamp
    );

    const temp = [];
    for (const e of sortedMessages) {
      let member;

      try {
        member =
          e[1].member ?? (await e[1].guild.members.fetch(e[1].author.id));
      } catch (error) {
        console.error("Error fetching member:", error);
        continue;
      }

      if (!member) {
        continue;
      }

      const roles = member.roles.cache
        .map((role) => role.name)
        .filter(
          (roleName) =>
            ![
              "MEMBER",
              "@everyone",
              "MASTER",
              "MOD",
              "Server Booster",
            ].includes(roleName)
        );

      const [gameName, world, progress] = e[1].content.split("\n");
      if (gameName?.trim() === "テンプレート") continue;

      const player = new Player(
        member.displayName || e[1].author.username,
        gameName?.trim().slice(5).replace(": ", "").replace("」", ""),
        ServerList.replace(world),
        progress?.trim().includes("最新") ? "最新" : "途中",
        roles.map((e) => e.trim())
      );

      temp.push(player);
    }

    const playerList = temp.filter((e) => {
      return e !== undefined;
    });
    return new PlayerList(playerList);
  }
}

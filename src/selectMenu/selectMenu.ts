import {
  ActionRowBuilder,
  GuildMember,
  GuildMemberRoleManager,
  Role,
  RoleManager,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  TextChannel,
} from "discord.js";
import { Option } from "./options/option";
import { Beginner } from "./options/beginner";
import { Crafter } from "./options/crafter";
import { DeepDungeon } from "./options/deepDungeon";
import { HighDifficulty } from "./options/highDifficulty";
import { IsLand } from "./options/isLand";
import { Mahjonng } from "./options/mahjong";
import { PvP } from "./options/pvp";
import { ScreenShot } from "./options/screenShot";
import { Treasure } from "./options/Treasure";

export class SelectMenu {
  private readonly selects: Option.Option[];
  constructor() {
    this.selects = [
      new Beginner(),
      new Crafter(),
      new DeepDungeon(),
      new HighDifficulty(),
      new IsLand(),
      new Mahjonng(),
      new PvP(),
      new ScreenShot(),
      new Treasure(),
    ];
  }
  public async createBtn(channel: TextChannel): Promise<void> {
    await channel.send({
      content:
        "好きなコンテンツがあれば以下よりご選択ください!\n以下ロールが付与されメンションを飛ばすことも可能なので、\n好きなコンテンツ同士のプレイヤーへ呼びかけることが可能です!",
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("contents")
            .setPlaceholder("コンテンツを選んでください")
            .addOptions(
              this.selects.map((e) => {
                return e.option;
              })
            )
        ),
      ],
    });
  }
  public async roleAdd(
    ir: StringSelectMenuInteraction
  ): Promise<string | undefined> {
    const guild = ir.client.guilds.cache.get(process.env.SERVER_ID!);
    if (!guild) return;
    const roles = guild.roles.cache;
    const member = ir.member as GuildMember;
    const memberRoles = member?.roles as GuildMemberRoleManager;

    for (const role of memberRoles.cache) {
      const r = role[1].name.split("\n");
      if (r.includes(ir.values[0])) {
        memberRoles.remove(role[0]);
        return `"${ir.values[0]}"を取り消しました`;
      }
    }

    if (memberRoles === undefined || roles === undefined) return;
    for (const select of this.selects) {
      if (ir.values[0] === select.option.value) {
        const role = roles.find((e) => {
          return e.name === select.option.value;
        });
        await select.roleAdd(role!, memberRoles);
        return `"${select.option.value}"の付与に成功しました`;
      }
    }
  }
}

import {
  GuildMemberManager,
  GuildMemberRoleManager,
  Role,
  SelectMenuComponentOptionData,
} from "discord.js";
import { Option } from "./option";

export class MobHunt implements Option.Option {
  private selectOption: SelectMenuComponentOptionData;
  constructor() {
    this.selectOption = {
      label: "モブハント",
      value: "モブハント",
    };
  }
  async roleAdd(role: Role, manager: GuildMemberRoleManager): Promise<void> {
    await manager.add(role);
  }
  get option(): SelectMenuComponentOptionData {
    return this.selectOption;
  }
}

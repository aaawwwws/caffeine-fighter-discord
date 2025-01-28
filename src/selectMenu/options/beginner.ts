import {
  GuildMemberManager,
  GuildMemberRoleManager,
  Role,
  SelectMenuComponentOptionData,
} from "discord.js";
import { Option } from "./option";

export class Beginner implements Option.Option {
  private selectOption: SelectMenuComponentOptionData;
  constructor() {
    this.selectOption = {
      label: "ビギナー",
      value: "ビギナー",
    };
  }
  async roleAdd(role: Role, manager: GuildMemberRoleManager): Promise<void> {
    await manager.add(role);
  }
  get option(): SelectMenuComponentOptionData {
    return this.selectOption;
  }
}

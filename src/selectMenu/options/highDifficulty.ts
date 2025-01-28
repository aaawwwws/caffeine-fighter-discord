import {
  GuildMemberManager,
  GuildMemberRoleManager,
  Role,
  SelectMenuComponentOptionData,
} from "discord.js";
import { Option } from "./option";

export class HighDifficulty implements Option.Option {
  private selectOption: SelectMenuComponentOptionData;
  constructor() {
    this.selectOption = {
      label: "零式・高難易度",
      value: "零式・高難易度",
    };
  }
  async roleAdd(role: Role, manager: GuildMemberRoleManager): Promise<void> {
    await manager.add(role);
  }
  get option(): SelectMenuComponentOptionData {
    return this.selectOption;
  }
}

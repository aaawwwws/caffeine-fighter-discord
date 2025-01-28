import {
  GuildMemberManager,
  GuildMemberRoleManager,
  Role,
  SelectMenuComponentOptionData,
} from "discord.js";

export namespace Option {
  export interface Option {
    roleAdd(Role: Role, manager: GuildMemberRoleManager): Promise<void>;
    get option(): SelectMenuComponentOptionData;
  }
}

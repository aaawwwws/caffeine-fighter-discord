import {
  CommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

export interface Command {
  get getName(): string;
  excute(interaction: CommandInteraction): void;
  ToJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody;
}

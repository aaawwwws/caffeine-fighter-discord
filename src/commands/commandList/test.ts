import {
  CommandInteraction,
  MessageFlags,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../command";

export class TestCommand implements Command {
  private readonly commad: SlashCommandBuilder;
  private readonly name: string;

  constructor() {
    this.name = "test";
    this.commad = new SlashCommandBuilder()
      .setName("test")
      .setDescription("test");
  }

  public get getName(): string {
    return this.name;
  }

  public excute(interaction: CommandInteraction): void {
    interaction.reply({
      content: "ててえててｔ",
      flags: MessageFlags.Ephemeral,
    });
  }

  public ToJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return this.commad.toJSON();
  }
}

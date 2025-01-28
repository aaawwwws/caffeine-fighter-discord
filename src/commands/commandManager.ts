import { CommandInteraction } from "discord.js";
import { Command } from "./command";
import { TestCommand } from "./commandList/test";

export class CommandManager {
  private readonly commands: Command[];

  constructor() {
    this.commands = [new TestCommand()];
  }

  public jsonArray() {
    return this.commands.map((command) => command.ToJSON());
  }

  public send(interaction: CommandInteraction): void {
    for (const c of this.commands) {
      if (interaction.commandName === c.getName) {
        c.excute(interaction);
        return;
      }
    }
  }
}

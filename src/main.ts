import * as dotenv from "dotenv";
import {
  GatewayIntentBits,
  Client,
  Partials,
  REST,
  Routes,
  TextChannel,
  ActionRowBuilder,
  Events,
  GuildMemberRoleManager,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  MessageFlags,
} from "discord.js";
import { CommandManager } from "./commands/commandManager";
import { SelectMenu } from "./selectMenu/selectMenu";
const main = async () => {
  dotenv.config();
  const TOKEN = process.env.TOKEN;
  const SERVER_ID = process.env.SERVER_ID;
  const CLIENT_ID = process.env.CLIENT_ID;

  const cm = new CommandManager();

  const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel],
  });

  const rest = new REST({ version: "10" }).setToken(TOKEN!);
  rest.put(Routes.applicationGuildCommands(CLIENT_ID!, SERVER_ID!), {
    body: cm.jsonArray(),
  });

  const selectMenu = new SelectMenu();

  client.once("ready", async () => {
    const channel = client.channels.cache.get(
      process.env.TEST_CHANNEL!
    ) as TextChannel;
    await selectMenu.createBtn(channel);
  });

  //セレクトメニューでの付与
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if ((interaction as StringSelectMenuInteraction).customId === "contents") {
      try {
        const roleStr = await selectMenu.roleAdd(interaction);
        await interaction.reply({
          content: `${roleStr}の付与に成功しました`,
          flags: MessageFlags.Ephemeral,
        });
      } catch (_) {
        await interaction.reply({
          content: "付与に失敗",
          flags: MessageFlags.Ephemeral,
        });
        console.log(_);
      }
    }
  });

  client.login(TOKEN!);
};

(async () => {
  await main();
})();

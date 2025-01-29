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
  ComponentType,
  Role,
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

  //セレクトメニューを生成
  client.once("ready", async () => {
    const channel = client.channels.cache.get(
      process.env.TEST_CHANNEL!
    ) as TextChannel;
    //既にセレクトメニューがログに存在する場合はセレクトメニューを生成しない
    const msgFetch = await channel.messages.fetch();
    msgFetch.forEach((msg) => {
      msg.components.forEach((cmp) => {
        cmp.components.forEach(async (select) => {
          if (select.type === ComponentType.StringSelect) {
            return;
          }
          await selectMenu.createBtn(channel);
        });
      });
    });
  });

  //セレクトメニューでのロール付与
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if ((interaction as StringSelectMenuInteraction).customId !== "contents")
      return;
    let msg: string | undefined;
    try {
      msg = await selectMenu.roleAdd(interaction);
    } catch (err) {
      console.log(err);
      msg = "付与に失敗しました";
    }
    await interaction.reply({
      content: msg,
      flags: MessageFlags.Ephemeral,
    });
  });

  client.login(TOKEN!);
};

(async () => {
  await main();
})();

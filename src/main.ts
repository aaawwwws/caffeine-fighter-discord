import * as dotenv from "dotenv";
import {
  GatewayIntentBits,
  Client,
  Partials,
  TextChannel,
  Events,
  StringSelectMenuInteraction,
  MessageFlags,
  ComponentType,
} from "discord.js";
import { SelectMenu } from "./selectMenu/selectMenu";
import { Population } from "./channel/channels/population";
import { PlayerFetch } from "./players/playerFetch";

const main = async () => {
  dotenv.config();
  const TOKEN = process.env.TOKEN;

  const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Message, Partials.Channel],
  });
  const selectMenu = new SelectMenu();

  //セレクトメニューを生成
  client.once(Events.ClientReady, async () => {
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

  //スラッシュコマンドの処理
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.options.getChannel("チャンネル")) return;
    if (interaction.commandName === "ano") {
      try {
        const ch = interaction.options.getChannel("チャンネル") as TextChannel;
        const content = interaction.options.getString("内容");
        await ch.send(`この発言は匿名で送信されています\n${content}`);
        await interaction.reply({
          content: "匿名で発言しました",
          flags: MessageFlags.Ephemeral,
        });
      } catch (e) {
        console.log(e);
      }
    }
  });

  //VC入退室時の処理ではある
  client.on(Events.VoiceStateUpdate, (oldState, newState) => {});

  client.on(Events.MessageCreate, async (msg) => {
    if (msg.author.bot) return;
    if (msg.author.displayName === "Dyno") return;
    const introductionChannel = client.channels.cache.get(
      process.env.INTRODUCTION!
    ) as TextChannel;

    //メンバーリストアップデート
    if (msg.content === "*update") {
      const pf = new PlayerFetch();
      const playerList = await pf.fetch(introductionChannel);
      const m = await playerList.writeFile().postGas();
      await msg.reply(m);
    }
  });

  //参加人数表示
  const population = new Population(client);
  let tempDate: Date;
  let init = true;

  client.on(Events.GuildMemberUpdate, async () => {
    const nowDate = new Date();
    if (init) {
      tempDate = new Date();
      await population.create();
      init = false;
    }
    if (nowDate.getTime() < tempDate.getTime() + 5 * 60000) return;
    tempDate = nowDate;
    try {
      await population.create();
    } catch (err) {
      console.log(err);
    }
  });

  //セレクトメニューでのロール付与
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if ((interaction as StringSelectMenuInteraction).customId !== "contents")
      return;
    let msg: string | undefined;
    try {
      msg = await selectMenu.roleHandler(interaction);
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

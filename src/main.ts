import * as dotenv from "dotenv";
import {
  GatewayIntentBits,
  Client,
  Partials,
  Message,
  SlashCommandBuilder,
  REST,
  Routes,
} from "discord.js";
const main = () => {
  dotenv.config();
  const TOKEN = process.env.TOKEN;
  const SERVER_ID = process.env.SERVER_ID;
  const CLIENT_ID = process.env.CLIENT_ID;

  const test = new SlashCommandBuilder().setName("test").setDescription("test");

  const commands = [test.toJSON()];

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
    body: commands,
  });

  client.once("ready", () => {
    console.log("Ready!");
    if (client.user) {
      console.log(client.user.tag);
    }
  });

  client.login(TOKEN!);
};

(async () => {
  main();
})();

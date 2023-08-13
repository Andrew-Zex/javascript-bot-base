const { Client, Collection, Events, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
    intents: [ 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations
    ]
  });

const config = require("./config.json");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
let token = config.token;
let appid = config.appid;
client.slashcommands = new Collection();
const rest = new REST({ version: "10" }).setToken(token);
const fs = require("fs")

const slashcommands = [];
readdirSync("./commands").forEach(async (file) => {
    const command = await require(`./commands/${file}`);
    slashcommands.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command);
  });

client.on(Events.ClientReady, async () => {
    try {
        await rest.put(Routes.applicationCommands(client.application.id), {
        body: slashcommands,
        });
    } catch (error) {
        console.error(error);
    }
    console.log(`   [Client]: ${client.user.username} Online!`);
});

readdirSync("./events").forEach(async (file) => {
    const event = await require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });

process.on("unhandledRejection", (e) => {
    console.log(e);
});
process.on("uncaughtException", (e) => {
    console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
    console.log(e);
});
  
client.login(token);
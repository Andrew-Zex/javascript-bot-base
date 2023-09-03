const { Client, Collection, Events, GatewayIntentBits } = require("discord.js"); //importing classes and functions from discord.js lobrary
const { token } = require("./config.json"); //importing token
const { readdirSync } = require("fs"); //function for checking flies in "commands" folder
const { REST } = require("@discordjs/rest"); //importing class for registering slash-commands
const { Routes } = require("discord-api-types/v10"); //importing Routes for slash-commands

const client = new Client({
    intents: [ 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations
    ]
}); //creating client and setting up intents
client.slashcommands = new Collection(); //creating slash-commands collection
const rest = new REST({ version: "10" }).setToken(token); //creating rest for registering slash-commands

const slashcommands = []; //setting up command list for registering
readdirSync("./commands").forEach(async (file) => {
    const command = await require(`./commands/${file}`);
    slashcommands.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command);
}); //getting commands from files in "commands" folder

client.on(Events.ClientReady, async () => {
    try {
        await rest.put(Routes.applicationCommands(client.application.id), {
        body: slashcommands,
        });
    } catch (error) {
        console.error(error);
    }
    console.log(`   [Client]: ${client.user.username} Online!`);
});//registering commands and logging client

readdirSync("./events").forEach(async (file) => {
    const event = await require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
}); //registering events

process.on("unhandledRejection", (e) => {
    console.log(e);
});
process.on("uncaughtException", (e) => {
    console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
    console.log(e);
});
  
client.login(token); //loggining client
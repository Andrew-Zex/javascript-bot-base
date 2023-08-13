const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("example")
    .setDescription("The Example Command"),
    run: async (client, interaction) => {
        try{
            interaction.reply(`This is Example!`)
        } catch(e) {
            console.error(`   [ERROR]: ${e}`)
        }
            
    }
 };
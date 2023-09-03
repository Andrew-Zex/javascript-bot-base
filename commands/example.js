const { SlashCommandBuilder } = require("@discordjs/builders"); //importing command builder from library

module.exports = {
  data: new SlashCommandBuilder() //creating command base
    .setName("example") //creating name for command
    .setDescription("The Example Command"), //creating descrition for command
    run: async (client, interaction) => {
        try{
            interaction.reply(`This is Example!`) // sending message
        } catch(e) {
            console.error(`   [ERROR]: ${e}`) //logging error
        }
    }
};
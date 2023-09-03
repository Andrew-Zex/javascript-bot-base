const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js"); //getting functions from discord.js library
const { SlashCommandBuilder } = require("@discordjs/builders"); //getting slash command builder

module.exports = {
  data: new SlashCommandBuilder() //creating command base
    .setName("modal") //creating command name
    .setDescription("Command using modals feature"), //creating command description
    run: async (client, interaction) => {
        try{
            let modal = new ModalBuilder() //creating modal
            .setCustomId("modal") //setting up title
            .setTitle("Modal window Title")//setting up description

            let textOne = new TextInputBuilder() //creating modal field
            .setCustomId("one") //setting up custom id
            //IMPORTANT: Custom IDs cannot be the same! You definitely need to create different ones!
            .setLabel('Input the text') //field placeholder
            .setMinLength(2) //minimum chars
            .setMaxLength(32) //maximum chars
            .setStyle(TextInputStyle.Short) //field type
            .setRequired(true)

            let textTwo = new TextInputBuilder()
            .setCustomId("two")
            .setLabel('Input the text')
            .setMinLength(2)
            .setMaxLength(512)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            let one = new ActionRowBuilder().addComponents(textOne) //getting field to modal
            let two = new ActionRowBuilder().addComponents(textTwo)//getting field to modal

            modal.addComponents(one, two) //adding fields to modal

            await interaction.showModal(modal) //showing modal
        } catch(e) {
            console.error(`   [ERROR]: ${e}`) //logging error
        }
            
    }
 };
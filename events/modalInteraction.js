const { Events, InteractionType } = require("discord.js");//importing functions from discord.js library

module.exports = {
    name: Events.InteractionCreate,
    execute: async(interaction) => {
        if (interaction.type == InteractionType.ModalSubmit) { //checking event type
            if(interaction.user.bot) return; // checking user type
            try {
                if (!interaction.isModalSubmit()) return;
                const first = interaction.fields.getTextInputValue('one'); //getting up modal fields
                const second = interaction.fields.getTextInputValue('two');//getting up modal fields
                if (interaction.customId === 'modal') {
                    await interaction.reply(`Modal created!\nCollected Data:\n- **${first}**\n- **${second}**`); //send modal fields values
                }
            } catch (e) {
                console.error(e)
                interaction.reply({content: "There was a problem when executing the command! Please try again.", ephemeral: true}) //logging error
            }
        }
    }
} //registering event
       
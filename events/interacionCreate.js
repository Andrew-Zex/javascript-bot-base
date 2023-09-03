const { Events, InteractionType } = require("discord.js"); //importing functions from discord.js library

module.exports = {
	name: Events.InteractionCreate,
	execute: async(interaction) => {
			let client = interaction.client; // getting client
			if (interaction.type == InteractionType.ApplicationCommand) { //checking event type
			if(interaction.user.bot) return;
			try {
				const command = client.slashcommands.get(interaction.commandName) //getting command name
				command.run(client, interaction) //running command
			} catch (e) {
				console.error(e)
				interaction.reply({content: "There was a problem when executing the command! Please try again.", ephemeral: true}) //logging error
			}
	 	}
  	}
} //registering event
const { ActivityType, Events } = require("discord.js") //importing functions from discord.js library

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		let activities = [ `Develoed by THDev.`, `${client.user.username}` ], i = 0;
		setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }), 22000);
	}
};//setting up presence
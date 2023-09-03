let {sharding, token} = require("./config.json") //importing token ad sharding status

if (sharding == true) { 
    const {ShardingManager} = require("discord.js")

    let shard = new ShardingManager("./bot.js", {
        token: token, // loggining bot for sharding
    })

    shard.on("shardCreate", shard => {
        console.log(`[Sharding]: Shard #${shard.id} spawned`) //logging sharding
    })
    shard.spawn() //spawning shards
} else {
    require("./bot.js") // if sharding status is FALSE we skip sharding code and starting main bot file
}
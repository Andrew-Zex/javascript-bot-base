let {sharding, token} = require("./config.json")

if (sharding == true) {
    const {ShardingManager} = require("discord.js")

    let shard = new ShardingManager("./bot.js", {
        token: token, 
    })

    shard.on("shardCreate", shard => {
        console.log(`[Sharding]: Shard #${shard.id} spawned`)
    })
    shard.spawn()
} else {
    require("./bot.js")
}
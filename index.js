const { Client } = require("discord.js");
const client = new Client ({intents: ["Guilds"]});

client.config = require("./config.json"); 
console.log(client.config.token);
client.login(client.config.token).then(() => {
    console.log(`client logged in as ${client.user.username}`);
    client.user.setActivity(`with ${client.guilds.cache.size} guilds`);
})
.catch((err) => console.log(err));
const { Client , GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers , GuildMessages } = GatewayIntentBits;
const { User, Message , GuildMember, ThreadMember } = Partials;

const { loadEvents } = require("./Handlers/eventHandler");

const client = new Client ({intents: [Guilds, GuildMember, GuildMessages], 
partials: [ User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json"); 
client.events = new Collection();
loadEvents(client);

console.log(client.config.token);
/*
client.login(client.config.token).then(() => {
    console.log(`client logged in as ${client.user.username}`);
    client.user.setActivity(`with ${client.guilds.cache.size} guilds`);
})
.catch((err) => console.log(err));
*/

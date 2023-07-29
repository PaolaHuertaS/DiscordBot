const { Client , GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers , GuildMessages } = GatewayIntentBits;
const { User, Message , GuildMember, ThreadMember } = Partials;

const client = new Client ({intents: [Guilds, GuildMember, GuildMessages], 
partials: [ User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json"); 
client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();
client.guildConfig = new Collection();

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {
}).then(() => console.log("The client is now connected to the databae"));

const{ loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);
const { loadConfig } = require("./Functions/configLoader");
loadConfig(client);
console.log(client.config.token);
/*client.login(client.config.token).then(() => {
    console.log(`client logged in as ${client.user.username}`);
    client.user.setActivity(`with ${client.guilds.cache.size} guilds`);
})
.catch((err) => console.log(err));
*/
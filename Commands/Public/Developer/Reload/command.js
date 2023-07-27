const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadCommands } = require("../../../../Handlers/commandHandler");

module.exports = { 
    subCommands : "reload.commands", 
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client){
        loadEvents(client);
        interaction.reply({ content: "reload events", ephemeral: true });
    }
}
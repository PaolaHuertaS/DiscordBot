const {  SlashCommandBuilder,  PermissionBlagsFlits } = require("discord.js"); 

    module.exports = {
        developer: true, 
        data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload your commands/events.")
        .setDefaultMemberPermissions(PermissionBlagsFlits.Administrator)
        .addSubcommand((options) => options 
        .setName("events")
        .setDescription("Reload your events."))
        .addSubcommand((options) => options 
        .setName("commands")
        .setDescription("Reload your commands.")),
    }
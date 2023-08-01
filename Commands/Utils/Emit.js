const {SlashCommandBuilder,
PermissionFlagsBits,
Client, ChatInputCommandInteraction} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Emit the guildMemberAdd/Remove")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction,client){
        client.emit("guildMemberRemove", interaction.member);
        interaction.reply({content: "Emited GuildMemberRemove",
    ephemeral: true});
    }
}
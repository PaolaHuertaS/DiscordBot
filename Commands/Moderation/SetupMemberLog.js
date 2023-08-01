const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType, GuildInviteManager} = require("discord.js");

const database = require("../../Schemas/MemberLog");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup_memberlog")
    .setDescription("Configure the memeber loggin system for your guild")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) => options 
    .setName("logchannel")
    .setDescription("Select the logging channel for this system")
    .addChannelTypes(ChannelType.GuildText)
    .setRequired(true)
    )
    .addRoleOption((options) => options 
    .setName("memberrole")
    .setDescription("Set the role to be automatically added to new members")
    )
    .addRoleOption((options) => options 
    .setName("botrole")
    .setDescription("Set the role to be automatically added to new bots")
    ),

    async execute(interaction, client){
        const {guild, options} = interaction;
        const logChannel = options.getChannel("log channel").id;

        let memberRole = options.getRole("member role")? 
        options.getRole("member_role").id : null;

        let botRole = options.getRole("bot role")? 
        options.getRole("bot_role").id : null;

        const guildConfigObject = {
            memberRole: memberRole,
            logChannel: logChannel,
            botRole : botRole
        }

        await database.findOneAndUpdate(
            {Guild: guild.id},
            { 
            memberRole: memberRole,
            logChannel: logChannel,
            botRole : botRole
            },
            {new: true, upsert: true}
        );

        client.guildConfig.set(guild.id, {
                memberRole: memberRole,
                logChannel: logChannel,
                botRole : botRole
                
        });

        const Embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription([
            `- Login Channel Updated: <#${logChannel}>` , 
            ` -Member Auto-Role Updated: ${memberRole ?` <@&${memberRole}> `: "Not specified."}`,
            ` -Bot Auto-Role Updated: ${botRole ?` <@&${botRole}> `: "Not specified."}`
        ].join("\n"));

        return interaction.reply({embeds: [Embed]});
    }

}



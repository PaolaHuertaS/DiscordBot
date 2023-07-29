const { ActionRowBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(options => options 
        .setName("question")
        .setDescription("Provide the question of the poll")
        .setRequired(true)
        ),
/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
        async execute(interaction){
            const pollQuestion = interaction.options.getString("question");

            const pollEmbed = new EmbedBuilder()
            .setDescription("**Question**\n" + pollQuestion)
            .setImage("https://bs.uenicdn.com/blog/wp-content/uploads/2018/04/giphy.gif")
            .addFields([
                {name: "Yes's", value: "0", inline: true},
                {name: "No's", value: "0", inline: true}
            ])
            .setColor([104,204, 156]);

            const replyObject = await interaction.reply(
                {embeds: [pollEmbed], fetchReply: true}
            );
            const pollButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Yes")
                .setCustomId(`Poll-Yes-${replyObject.id}`)
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel("No")
                .setCustomId(`Poll-No-${replyObject.id}`)
                .setStyle(ButtonStyle.Success)
            )
            interaction.editReply({components: [pollButtons]});
            
        }
}
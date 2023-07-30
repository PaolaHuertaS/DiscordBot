const { ChatInputCommandInteraction, SlashCommandBuilder, 
EmbedBuilder, AttachmentBuilder, Embed} = require("discord.js");

const { profileImage } = require('discord-arts');

module.exports = {
    date: new SlashCommandBuilder()
    .setName("memberinfo")
    .setDescription("View your or any member's information")
    .setDMPermission(false)
    .addUserOption((option) => option
    .setName("member")
    .setDescription("View a members information. Leave empty to view your own")
    ),
    /**
     *  @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.deferReply()
        const member = interaction.options.getMember("member") || interaction.member;

        if(member.user.bot) return interaction.editReply({
            embeds: 
            [
                new EmbedBuilder().setDescription("At this moment, bots are not supported for this command")
            ],
            ephemeral: true 
        });
        try {
            const fetchedMembers = await interaction.guild.members.fetch();
            const profileBuffer = await profileImage(member.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, {name: 'profile.png'});

            const joinPosition = Array.from(fetchedMembers
                .sort((a,b) => a.joinedTimestamp - b.joinedTimestamp)
                .keys())
                .indexOf(member.id) + 1;

                const topRoles = member.roles.cache
                .sort((a,b) => b.position - a.position)
                .map(role => role)
                .slice(0,3);

                const userBadges = member.user.flags.toArray()

                const joinTime = parseInt(member.joinedTimestamp / 1000);
                const createdTime = parseInt(member.user.createdTimestap/ 1000);

                const Booster = member.premiumSince ? "" : "X";

                const Embed = new EmbedBuilder()
                .setAuthor({name: `${member.user.tag} | General information `, iconURL : member.displayAvatarURL()})
                .setColor(member.displayColor)
                .setDescription(`On <t:${joinTime}:D>, ${member.user.username} joined as the **${addSuffix(joinPosition)}** member of this guild `)
                .setImage("attachment://profile.png")
                .addFields([
                    {name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true}, 
                    {name: "Booster", value: `${Booster}`, inline: true},
                    {name: "Top Roles", value: `${topRoles.join("").replace(`<@${interaction.guildId}>`)}`, inline: false},
                    {name: "Created", value: `<t:${createdTime}:R>`, inline: true},
                    {name: "Joined", value: `<t:${joinTime}:R>`, inline: true},
                    {name: "Identifier", value: `${member.id}`, inline: false},
                    {name: "Avatar", value: `[Link](${member.displayAvatarURL()})`, inline: true},
                    {name: "Banner", value: `[Link](${(await member.user.fetch()).bannerURL()})`, inline: true},

                ]);
                interaction.editReply({embeds: [Embed], files: [imageAttachment]});
                
        }catch(error){
            interaction.editReply({content: "An error ocurred" });
            throw error;
        }
    }
}


function addSufix(number){
    if(numer % 100 >= 11 && numer % 100 <= 13 )
    return number + "th";

    switch(number % 10){
        case 1: return number + "st";
        case 2: return number + "nd"; 
        case 3: return number + "rd";
    }
    return number +"th";
}

function addBadges(badgeNames){
    const badgeMap = {
        "ActiveDeveloper": "", 
        /*
        etc
        */
    };
    return badgeNames.map(badgeMap => badgeMap[badgeName] || '?');
}
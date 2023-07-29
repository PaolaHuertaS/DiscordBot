const { ButtonInteraction, 
EmbedBuilder} = require("discord.js");

module.exports = {
    name : "interactionCreate",
    async execute(interaction){
        if(!interaction.isButton())return; 

        const splitArray = interaction.customId.split("-");
        if(!splitArray[0] !== "MemberLogging") return;
        
        const member = (await interaction.guild.members.fetch()).get(splitArray[2]);
        const Embed = new EmbedBuilder();
        const errorArray = [];

        if(!interaction.member.permission.has("KickMembers"))
        errorArray.push("You do no have the required permissions for this action");

        if(!member)
        errorArray.push("This user is no loger a member of this guild")

        if(!member.moderatable)
        errorArray.push(`${member} is not moderatable by this bot`);

        if(errorArray.length) return interaction.reply({
            embeds: [Embed.setDescription(errorArray.join("\n"))],
            ephemeral: true
        });

        switch(splitArray[1]){
            case "Kick": {
                member.kick(`Kicked by: ${interaction.user.tag} | Member Logging System`).then(() => {
                    interaction.reply({ embeds: [Embed.setDescription(`${member} has been kicked.`)]})
                }).catch(() => {
                    interaction.reply({ embeds: [Embed.setDescription(`${member} could not be kicked.`)]})
                })
            }
            break;
            case "Ban":{
                member.ban(`Banned by: ${interaction.user.tag} | Member Logging System`).then(() => {
                    interaction.reply({ embeds: [Embed.setDescription(`${member} has been ban.`)]})
                }).catch(() => {
                    interaction.reply({ embeds: [Embed.setDescription(`${member} could not be banned.`)]})
                })
            }
            break; 
        }
    }
}
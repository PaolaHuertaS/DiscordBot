const { ChatInputCommandInteraction , SlashCommandBuilder} = require("discord.js"); 

module.exports = { 
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will repond with pong."), 
    /**
     * 
     * @param {ChatInputCommandInteraction} interactin 
     */
    execute(interactin){
        interactin.reply({content: "Pong!", ephemeral : true});
    }
}
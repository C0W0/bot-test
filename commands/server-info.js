module.exports = {
    name: 'server',
    description: "Replies with server info",
    slashCmd: true,
    executeT(message, args){
        message.channel.send(`Server name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
    },
    async executeS(interaction){
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`);
    }
    
}
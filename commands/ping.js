module.exports = {
    name: 'ping',
    description: "This is the ping command!",
    slashCmd: true,
    executeT(message, args){
        message.channel.send('pong!');
    },
    async executeS(interaction){
        await interaction.reply('pong!');
    }
    
}
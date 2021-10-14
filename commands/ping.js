module.exports = {
    name: 'ping',
    description: "This is the ping command!",
    slashCmd: true,
    executeT(keyv, message, args){
        message.channel.send('pong!');
    },
    async executeS(keyv, interaction){
        await interaction.reply('pong!');
    }
    
}
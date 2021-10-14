module.exports = {
    name: 'test',
    description: "Test command",
    slashCmd: true,
    executeT(message, args){
        // const a = [1,2,3];
        console.log(args);
        message.channel.send(`<@&${'898008668140875836'}>, Hello!`);
    },
    async executeS(interaction){
        await interaction.reply('pong!');
    }
    
}
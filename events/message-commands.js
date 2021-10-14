const { prefix } = require("../config.json");

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(keyv, message){
        // const prefix = config.prefix;
        if(!message.content.startsWith(prefix) || message.author.bot)
            return;
        
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = message.client.commands.get(commandName);
    
        if(!command)
            return;
    
        command.executeT(keyv, message, args);
    }
}
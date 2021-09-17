const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
Discord.Intents.FLAGS.GUILDS]});

const prefix = config.prefix;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let input = " ";
    if(args.length > 0)
        input = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
        if(input === 'pong'){
            message.channel.send('wat?');
        }
    }
});



client.login(config.token);
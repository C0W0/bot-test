const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
Discord.Intents.FLAGS.GUILDS]});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(let file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const prefix = config.prefix;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
});



client.login(config.token);
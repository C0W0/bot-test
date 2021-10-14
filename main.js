const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const Keyv = require('keyv');

const keyvMap = new Keyv();

const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
Discord.Intents.FLAGS.GUILDS]});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(let file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

keyvMap.set('admin role', '<>');
keyvMap.set('remind role', '<>');

for(let file of eventFiles){
    const event = require(`./events/${file}`);
    if(event.once){
        client.once(event.name, (...args) => event.execute(keyvMap, ...args));
    }else{
        client.on(event.name, (...args) => event.execute(keyvMap, ...args));
    }
}

keyvMap.on('error', err => console.error('keyv connection error: '+err));

const prefix = config.prefix;



client.login(config.token);
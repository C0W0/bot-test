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

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) 
        return;

    const { commandName } = interaction;

    if(commandName === 'ping'){
        await interaction.reply('pong!');
    } else if(commandName === 'server'){
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`);
    } else if(commandName === 'user'){
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
    

});

client.login(config.token);
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
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if(!command)
        return;

    command.executeT(message, args);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) 
        return;

    const command = client.commands.get(interaction.commandName);

    if(!command)
        return;
    
    try{
        await command.executeS(interaction);
    }catch(error){
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true});
    }
    

});



client.login(config.token);
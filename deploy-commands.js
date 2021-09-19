const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const { Client } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const rest = new REST({ version: '9'}).setToken(config.token);

const commands = [];
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(let file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(new SlashCommandBuilder().setName(command.name).setDescription(command.description).toJSON());
}


(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log("Successfully registered application commands. ");
    } catch (error){
        console.error(error);
    }
})();
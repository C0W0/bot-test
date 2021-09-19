const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const { Client } = require('discord.js');
const config = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info')
].map(command => command.toJSON());

const rest = new REST({ version: '9'}).setToken(config.token);

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
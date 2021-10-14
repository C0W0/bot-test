module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction){
        if(!interaction.isCommand()) 
        return;

        const commandName = interaction.commandName;
        const command = interaction.client.commands.get(commandName);
        if(!command)
            return;
        
        try{
            await command.executeS(interaction);
        }catch(error){
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true});
        }
    }
}
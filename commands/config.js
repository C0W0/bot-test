module.exports = {
    name: 'config',
    description: "role configuration",
    slashCmd: false,
    async executeT(keyv, message, args){
        const a = [1,2,3];
        if(args.length === 0){
            message.channel.send("Please configure roles using ```--config <role type> <role>```");
        }else {
            const roleType = args.shift().toLowerCase();
            if(roleType === 'admin'){
                await keyv.set('admin role', args.shift());
                message.channel.send(`Successfully configured the admin role as ${await keyv.get('admin role')}`);
            }else if(roleType === 'remind'){
                await keyv.set('remind role', args.shift());
                message.channel.send(`Successfully configured the reminding role as ${await keyv.get('remind role')}`);
            }else if(roleType === 'reset'){
                await keyv.set('remind role', '<>');
                await keyv.set('admin role', '<>');
                message.channel.send('Successfully reset roles');
            }else if(roleType === 'list'){
                message.channel.send(`admin role: ${await keyv.get('admin role')}`);
                message.channel.send(`reminding role: ${await keyv.get('remind role')}`);
            }else{
                message.channel.send("Unknown command, please try again.");
            }

        }
    },
    async executeS(keyv, interaction){
        await interaction.reply('currently unavailable');
    }
    
}
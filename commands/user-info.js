const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: 'user',
    description: "Replies with user info",
    slashCmd: true,
    executeT(message, args){
        const user = message.mentions.users.first() || message.member.user;
        const member = message.guild.members.cache.get(user.id);
        const embed1 = new MessageEmbed()
            .setAuthor(`User info for ${user.username}`, user.avatarURL()) 
            .addFields({
                name: 'User tag',
                value: user.tag,
            },
            {
                name: 'Is bot',
                value: String(user.bot),
            },
            {
                name: 'Nickname',
                value: member.nickname || user.username,
            },
            {
                name: 'Joined server',
                value: new Date(member.joinedTimestamp).toLocaleDateString(),
            },
            {
                name: 'Joined Discord',
                value: new Date(user.createdTimestamp).toLocaleDateString(),
            },
            {
                name: 'Role count',
                value: String(member.roles.cache.size - 1)
            });
        message.channel.send({embeds: [embed1]});
    },
    async executeS(interaction){
        const user = interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const embed1 = new MessageEmbed()
            .setAuthor(`User info for ${user.username}`, user.avatarURL()) 
            .addFields({
                name: 'User tag',
                value: user.tag,
            },
            {
                name: 'Is bot',
                value: String(user.bot),
            },
            {
                name: 'Nickname',
                value: member.nickname || user.username,
            },
            {
                name: 'Joined server',
                value: new Date(member.joinedTimestamp).toLocaleDateString(),
            },
            {
                name: 'Joined Discord',
                value: new Date(user.createdTimestamp).toLocaleDateString(),
            },
            {
                name: 'Role count',
                value: String(member.roles.cache.size - 1)
            });
        await interaction.reply({embeds: [embed1]});
    }
    
}
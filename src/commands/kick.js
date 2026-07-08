const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a user (owner only)',
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return await message.reply('❌ Only the owner can use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return await message.reply('❌ Please mention a user to kick.');
    }

    try {
      await message.guild.members.kick(user, 'Kicked by uwu bot');

      const embed = new EmbedBuilder()
        .setColor('#FF6347')
        .setTitle('👢 User Kicked')
        .setDescription(`${user} has been kicked from the server.`)
        .setFooter({ text: `Kicked by ${message.author.username}` });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to kick the user.');
    }
  },
};


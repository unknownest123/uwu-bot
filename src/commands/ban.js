const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a user (owner only)',
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return await message.reply('❌ Only the owner can use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return await message.reply('❌ Please mention a user to ban.');
    }

    try {
      await message.guild.members.ban(user, { reason: 'Banned by uwu bot' });

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🔨 User Banned')
        .setDescription(`${user} has been banned from the server.`)
        .setFooter({ text: `Banned by ${message.author.username}` });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to ban the user.');
    }
  },
};


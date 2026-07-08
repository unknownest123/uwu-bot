const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Timeout a user',
  async execute(message, args, client) {
    if (!message.member.permissions.has('ModerateMembers')) {
      return await message.reply('❌ You don\'t have permission to mute users.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return await message.reply('❌ Please mention a user to mute.');
    }

    const member = await message.guild.members.fetch(user.id);
    const duration = 10 * 60 * 1000; // 10 minutes

    try {
      await member.timeout(duration, 'Muted by uwu bot');

      const embed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('🔇 User Muted')
        .setDescription(`${user} has been muted for 10 minutes.`)
        .setFooter({ text: `Muted by ${message.author.username}` });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to mute the user.');
    }
  },
};


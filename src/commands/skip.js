const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Skip the current song',
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('⏭️ Song Skipped')
      .setDescription('Skipping to the next song...')
      .setFooter({ text: 'uwu bot' });

    await message.reply({ embeds: [embed] });
  },
};


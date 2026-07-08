const { getVoiceConnection } = require('@discordjs/voice');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'stop',
  description: 'Stop the music',
  async execute(message, args, client) {
    const connection = getVoiceConnection(message.guildId);

    if (!connection) {
      return await message.reply('❌ The bot is not playing any music.');
    }

    connection.destroy();

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('⏹️ Music Stopped')
      .setDescription('The music has been stopped.')
      .setFooter({ text: 'uwu bot' });

    await message.reply({ embeds: [embed] });
  },
};


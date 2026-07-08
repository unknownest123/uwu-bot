const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  async execute(message, client) {
    const embed = new EmbedBuilder()
      .setColor('#00BFFF')
      .setTitle('🏓 Pong!')
      .setDescription(`Bot latency: **${client.ws.ping}ms**`)
      .setFooter({ text: 'uwu bot' });

    await message.reply({ embeds: [embed] });
  },
};


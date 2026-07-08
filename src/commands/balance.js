const { EmbedBuilder } = require('discord.js');
const { getUserBalance } = require('../utils/database');

module.exports = {
  name: 'balance',
  description: 'Check your money balance',
  async execute(message, args, client) {
    try {
      const userId = message.author.id;
      const balance = await getUserBalance(userId);

      const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('💰 Your Balance')
        .setDescription(`You have **$${balance}**`)
        .setFooter({ text: message.author.username });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Error checking balance.');
    }
  },
};


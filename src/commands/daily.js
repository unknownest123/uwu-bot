const { EmbedBuilder } = require('discord.js');
const { getUserBalance, updateUserBalance, getLastDaily, updateLastDaily } = require('../utils/database');

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward',
  async execute(message, args, client) {
    try {
      const userId = message.author.id;
      const now = Date.now();
      const cooldown = 24 * 60 * 60 * 1000; // 24 hours

      const lastDaily = await getLastDaily(userId);
      if (lastDaily && now - lastDaily < cooldown) {
        const timeLeft = Math.ceil((cooldown - (now - lastDaily)) / 1000 / 60 / 60);
        return await message.reply(`⏰ You can claim your daily reward in **${timeLeft}** hours.`);
      }

      const reward = 500;
      const newBalance = await updateUserBalance(userId, reward);
      await updateLastDaily(userId);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('✅ Daily Reward Claimed!')
        .setDescription(`You received **$${reward}**\nNew balance: **$${newBalance}**`)
        .setFooter({ text: 'Come back tomorrow!' });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Error claiming daily reward.');
    }
  },
};


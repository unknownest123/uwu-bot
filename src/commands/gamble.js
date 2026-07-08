const { EmbedBuilder } = require('discord.js');
const { getUserBalance, updateUserBalance } = require('../utils/database');

module.exports = {
  name: 'gamble',
  description: 'Gamble your money',
  async execute(message, args, client) {
    try {
      const userId = message.author.id;
      const amount = parseInt(args[0]);

      if (!amount || isNaN(amount) || amount <= 0) {
        return await message.reply('❌ Please specify a valid amount to gamble.');
      }

      const currentBalance = await getUserBalance(userId);

      if (amount > currentBalance) {
        return await message.reply(`❌ You don't have enough money! You have **$${currentBalance}**`);
      }

      const won = Math.random() > 0.5;
      const changeAmount = won ? amount : -amount;
      const newBalance = await updateUserBalance(userId, changeAmount);

      const embed = new EmbedBuilder()
        .setColor(won ? '#00FF00' : '#FF0000')
        .setTitle(won ? '🎉 You Won!' : '😢 You Lost!')
        .setDescription(`You gambled **$${amount}**\n${won ? `You won **$${amount}**!` : `You lost **$${amount}**!`}\nNew balance: **$${newBalance}**`)
        .setFooter({ text: 'Gamble responsibly!' });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Error processing gamble.');
    }
  },
};


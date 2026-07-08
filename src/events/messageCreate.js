const { EmbedBuilder } = require('discord.js');
const { getAIResponse } = require('../utils/ai');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;

    // Check if message starts with "uwu,"
    if (!message.content.toLowerCase().startsWith('uwu,')) return;

    // Extract command and args
    const args = message.content.slice(4).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get command
    const command = client.commands.get(commandName);

    if (command) {
      try {
        await command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        await message.reply('❌ An error occurred while executing that command.');
      }
    } else {
      // AI fallback for unknown commands
      try {
        const userInput = message.content.slice(4).trim();
        const response = await getAIResponse(userInput, message.author.id);
        
        const embed = new EmbedBuilder()
          .setColor('#FF69B4')
          .setAuthor({ name: 'uwu AI', iconURL: client.user.avatarURL() })
          .setDescription(response)
          .setFooter({ text: `Requested by ${message.author.username}` });

        await message.reply({ embeds: [embed] });
      } catch (error) {
        console.error('AI Error:', error);
        await message.reply('❌ I couldn\'t understand that. Try `uwu, help`');
      }
    }
  },
};


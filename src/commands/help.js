const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Shows all available commands',
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('uwu Bot Commands')
      .setDescription('Prefix: `uwu,`')
      .addFields(
        { name: '💰 Money Commands', value: '`daily` - Claim your daily reward\n`balance` - Check your balance\n`gamble <amount>` - Gamble your money (50/50 chance)', inline: false },
        { name: '🎵 Music Commands', value: '`play <song>` - Play a song in VC\n`stop` - Stop the music\n`skip` - Skip current song', inline: false },
        { name: '⚙️ Moderation Commands', value: '`mute @user` - Timeout a user\n`ban @user` - Ban a user (owner only)\n`kick @user` - Kick a user (owner only)', inline: false },
        { name: '🤖 AI Commands', value: 'Just type `uwu, <anything>` and I\'ll respond with AI!', inline: false },
        { name: '📊 Other', value: '`help` - Show this message\n`ping` - Check bot latency', inline: false }
      )
      .setFooter({ text: 'Made with ❤️ by uwu' });

    await message.reply({ embeds: [embed] });
  },
};


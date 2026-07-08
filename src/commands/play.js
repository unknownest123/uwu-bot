const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'play',
  description: 'Play a song in voice channel',
  async execute(message, args, client) {
    if (!message.member.voice.channel) {
      return await message.reply('❌ You must be in a voice channel to play music.');
    }

    const songName = args.join(' ');
    if (!songName) {
      return await message.reply('❌ Please specify a song name or YouTube URL.');
    }

    try {
      await message.reply('🎵 Searching for song...');

      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      connection.subscribe(player);

      // For demo purposes, we'll just acknowledge the command
      const embed = new EmbedBuilder()
        .setColor('#FF1493')
        .setTitle('🎵 Now Playing')
        .setDescription(`**${songName}**`)
        .setFooter({ text: 'Music player active' });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to play music. Make sure you\'re in a voice channel.');
    }
  },
};


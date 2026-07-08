# uwu Discord Bot

A cute and powerful Discord bot with money system, gambling, music, moderation, and AI integration.

## Features

✨ **Money System** - Earn and manage virtual currency
🎰 **Gambling** - Gamble your money with 50/50 odds
🎵 **Music** - Play music in voice channels
⚙️ **Moderation** - Mute, kick, and ban users
🤖 **AI Integration** - Chat with an AI-powered bot
💰 **Daily Rewards** - Claim daily money rewards

## Commands

All commands start with `uwu,`

### Money Commands
- `uwu, balance` - Check your balance
- `uwu, daily` - Claim your daily reward ($500)
- `uwu, gamble <amount>` - Gamble your money (50/50 chance)

### Music Commands
- `uwu, play <song>` - Play a song in voice channel
- `uwu, stop` - Stop the music
- `uwu, skip` - Skip current song

### Moderation Commands
- `uwu, mute @user` - Timeout a user for 10 minutes
- `uwu, ban @user` - Ban a user (owner only)
- `uwu, kick @user` - Kick a user (owner only)

### Other Commands
- `uwu, help` - Show all commands
- `uwu, ping` - Check bot latency
- `uwu, <anything>` - Chat with AI!

## Setup

### Prerequisites
- Node.js 18+
- Discord Bot Token
- OpenAI API Key (for AI features)

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd uwu-bot
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Fill in your credentials in `.env`:
```
DISCORD_TOKEN=your_bot_token
OWNER_ID=your_discord_id
OPENAI_API_KEY=your_openai_key
NODE_ENV=production
```

5. Start the bot
```bash
npm start
```

## Creating a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Go to "Bot" section and click "Add Bot"
4. Copy the token and paste it in `.env`
5. Enable these Intents:
   - Message Content Intent
   - Server Members Intent
   - Guild Messages
6. Go to OAuth2 > URL Generator
7. Select scopes: `bot`
8. Select permissions:
   - Send Messages
   - Manage Messages
   - Timeout Members
   - Kick Members
   - Ban Members
   - Connect (Voice)
   - Speak (Voice)
9. Copy the generated URL and open it to invite the bot to your server

## Getting OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Go to API keys section
4. Create a new API key
5. Paste it in `.env`

## License

MIT


# uwu Bot - Complete Setup Guide

## 🚀 Quick Start

### Step 1: Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** and name it "uwu"
3. Go to the **"Bot"** tab on the left
4. Click **"Add Bot"**
5. Under the TOKEN section, click **"Copy"** to copy your bot token
6. **Save this token** - you'll need it later

### Step 2: Configure Bot Permissions

1. Still in Developer Portal, go to **OAuth2** → **URL Generator**
2. Under **SCOPES**, select:
   - ✅ `bot`
3. Under **PERMISSIONS**, select:
   - ✅ Send Messages
   - ✅ Manage Messages
   - ✅ Timeout Members
   - ✅ Kick Members
   - ✅ Ban Members
   - ✅ Connect (Voice)
   - ✅ Speak (Voice)
4. Copy the generated URL at the bottom
5. Open the URL in your browser to invite the bot to your server

### Step 3: Enable Required Intents

1. In Developer Portal, go to **Bot** tab
2. Scroll down to **GATEWAY INTENTS**
3. Enable:
   - ✅ Message Content Intent
   - ✅ Server Members Intent
   - ✅ Guild Messages

### Step 4: Get Your Discord User ID

1. In Discord, enable **Developer Mode** (User Settings → Advanced → Developer Mode)
2. Right-click your username and select **"Copy User ID"**
3. **Save this ID** - you'll need it for owner-only commands

### Step 5: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy the key
5. **Save this key** - you'll need it for AI features

### Step 6: Deploy on Railway

#### Option A: Using Railway Dashboard (Recommended)

1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Click **"Deploy from GitHub"** or **"Create Service"**
4. If using GitHub:
   - Connect your GitHub account
   - Select the uwu-bot repository
5. If creating manually:
   - Select **"Docker"** as the source
   - Paste the Dockerfile content
6. Add environment variables:
   - `DISCORD_TOKEN` = Your bot token from Step 1
   - `OWNER_ID` = Your Discord ID from Step 4
   - `OPENAI_API_KEY` = Your OpenAI key from Step 5
   - `NODE_ENV` = `production`
7. Click **"Deploy"**

#### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create a new project
railway init

# Add environment variables
railway variables set DISCORD_TOKEN=your_token_here
railway variables set OWNER_ID=your_id_here
railway variables set OPENAI_API_KEY=your_key_here
railway variables set NODE_ENV=production

# Deploy
railway up
```

## 📝 Command Reference

### Money Commands
```
uwu, balance          - Check your money balance
uwu, daily            - Claim $500 daily reward (24h cooldown)
uwu, gamble <amount>  - Gamble money (50/50 chance to win/lose)
```

### Music Commands
```
uwu, play <song>      - Play a song in your voice channel
uwu, stop             - Stop the music
uwu, skip             - Skip to next song
```

### Moderation Commands
```
uwu, mute @user       - Timeout a user for 10 minutes
uwu, ban @user        - Ban a user (OWNER ONLY)
uwu, kick @user       - Kick a user (OWNER ONLY)
```

### AI & Other
```
uwu, help             - Show all commands
uwu, ping             - Check bot latency
uwu, <anything>       - Chat with AI!
```

## 🎮 Example Usage

```
User: uwu, help
Bot: [Shows all available commands]

User: uwu, balance
Bot: You have $1000

User: uwu, daily
Bot: You received $500! New balance: $1500

User: uwu, gamble 100
Bot: 🎉 You Won! You won $100! New balance: $1600

User: uwu, hello
Bot: [AI responds with a cute message]

User: uwu, mute @spammer
Bot: User has been muted for 10 minutes
```

## 🔧 Troubleshooting

### Bot doesn't respond
- ✅ Check if bot is online in Discord
- ✅ Make sure you're using `uwu,` prefix (with comma)
- ✅ Check Railway logs for errors

### AI features not working
- ✅ Verify OPENAI_API_KEY is set correctly
- ✅ Check if you have API credits on OpenAI
- ✅ Check Railway logs for API errors

### Music not playing
- ✅ Make sure you're in a voice channel
- ✅ Check bot has "Connect" and "Speak" permissions
- ✅ Try `uwu, stop` then `uwu, play` again

### Owner commands not working
- ✅ Verify OWNER_ID is set to your Discord ID
- ✅ Make sure you're using the exact command format

## 📊 Monitoring

### Check Bot Status
```
uwu, ping
```

### View Railway Logs
1. Go to your Railway project
2. Click on the uwu-bot service
3. Go to **"Logs"** tab
4. View real-time logs

## 🛡️ Security Notes

- **Never share your bot token** - it's like a password
- **Never share your OpenAI API key** - it can be used to spend your credits
- **Keep OWNER_ID private** - only you should have owner commands
- Use Railway's secret management for sensitive data

## 📚 Additional Resources

- [Discord.js Documentation](https://discord.js.org)
- [Discord Developer Portal](https://discord.com/developers)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Railway Documentation](https://docs.railway.app)

## 💡 Tips

- Start with small gamble amounts to test the system
- Use `uwu, help` to see all commands in Discord
- The AI learns from conversation history (last 10 messages)
- Daily rewards reset every 24 hours
- Money persists while the bot is running (stored in memory)

## 🐛 Reporting Issues

If you encounter bugs:
1. Check the Railway logs
2. Verify all environment variables are set
3. Make sure the bot has required permissions
4. Try restarting the service

---

**Enjoy your uwu bot! 💕**


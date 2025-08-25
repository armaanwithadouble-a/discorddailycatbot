# CatBot Discord Bot

A Discord bot that sends random cat images every minute to channels where it's been activated.

## Features

- 🐱 Sends random cat images from The Cat API
- ⏰ Automatic sending every minute
- 📍 Channel-specific activation with `/startdailycatshere`
- 🚫 Prevents duplicate activation in same channel
- ✅ Immediate cat delivery when activated

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create Discord Application:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create New Application
   - Go to Bot section and create bot
   - Copy the Bot Token

3. **Get Client ID:**
   - In your application, go to General Information
   - Copy the Application ID

4. **Configure bot:**
   - Copy `config.example.js` to `config.js`
   - Fill in your `DISCORD_TOKEN` and `CLIENT_ID`

5. **Invite bot to server:**
   - Go to OAuth2 > URL Generator
   - Select scopes: `bot`, `applications.commands`
   - Select permissions: `Send Messages`, `Use Slash Commands`
   - Use the generated URL to invite bot

6. **Run bot:**
```bash
npm start
```

## Usage

- Use `/startdailycatshere` in any channel to start daily cats
- Bot will send a random cat image every minute
- Each channel can only be activated once
- Cats are fetched fresh from The Cat API each time

## Commands

- `/startdailycatshere` - Start sending daily cats in current channel

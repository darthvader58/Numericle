# Numericle Discord Bot

A Discord bot for playing Numericle - the daily sequence puzzle game!

## Features

- 🎮 Daily sequence puzzles synchronized globally
- 🟩🟨⬜ Wordle-style color feedback
- 💡 5 hints per game
- 📊 Track your progress
- 🌍 Same puzzle for everyone each day

## Setup

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Under "Privileged Gateway Intents", enable:
   - Presence Intent
   - Server Members Intent
   - Message Content Intent
5. Click "Reset Token" and copy your bot token
6. Go to "OAuth2" > "General" and copy your Client ID

### 2. Install Dependencies

```bash
cd discord-bot
npm install
```

### 3. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
```

### 4. Invite Bot to Server

Generate an invite link:
1. Go to Discord Developer Portal > Your App > OAuth2 > URL Generator
2. Select scopes: `bot`, `applications.commands`
3. Select bot permissions: `Send Messages`, `Embed Links`, `Use Slash Commands`
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

### 5. Run the Bot

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Commands

- `/numericle` - Start a new game
- `/guess <numbers>` - Make a guess (e.g., `/guess 1 2 3 4 5 6 7`)
- `/hint` - Use a hint to reveal one position
- `/status` - Check your current game status
- `/give-up` - Give up and see the solution
- `/rules` - Learn how to play

## Game Rules

1. Guess the 7-number sequence in 10 attempts
2. Each guess gets color-coded feedback:
   - 🟩 Green: Correct number, correct position
   - 🟨 Yellow: Correct number, wrong position
   - ⬜ Gray: Number not in sequence
3. Use hints wisely (5 per game)
4. New puzzle every day at midnight GMT

## Example Gameplay

```
/numericle
> Bot starts a new game

/guess 1 2 3 4 5 6 7
> 🟩 1  ⬜ 2  🟨 3  ⬜ 4  🟩 5  ⬜ 6  🟨 7

/hint
> Position 3 is 9

/guess 1 9 5 8 5 10 13
> 🟩 1  🟩 9  🟩 5  🟩 8  🟩 5  🟩 10  🟩 13
> 🎉 You Won!
```

## Tech Stack

- TypeScript
- Discord.js v14
- Node.js

## License

APACHE 2.0

## Credits

Made with <3 by Shashwat Raj
Inspired by New York Times' Wordle

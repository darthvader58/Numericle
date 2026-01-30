import { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } from 'discord.js';
import * as dotenv from 'dotenv';
import { commands } from './commands';
import { hasActiveGame, getGame, startNewGame, updateGame } from './gameManager';
import { checkGuess, isWinningGuess, formatGuessDisplay, generateShareText } from './gameLogic';
import { getDailyPuzzleId, getRuleDescription } from './puzzleGenerator';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const MAX_ATTEMPTS = 10;
const MAX_HINTS = 5;

client.once('ready', () => {
  console.log(`✅ Numericle bot is online as ${client.user?.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user, channelId } = interaction;

  try {
    switch (commandName) {
      case 'numericle':
        await handleStart(interaction);
        break;
      case 'guess':
        await handleGuess(interaction);
        break;
      case 'hint':
        await handleHint(interaction);
        break;
      case 'status':
        await handleStatus(interaction);
        break;
      case 'give-up':
        await handleGiveUp(interaction);
        break;
      case 'rules':
        await handleRules(interaction);
        break;
    }
  } catch (error) {
    console.error('Error handling command:', error);
    await interaction.reply({ content: 'An error occurred!', ephemeral: true });
  }
});

async function handleStart(interaction: any) {
  const userId = interaction.user.id;
  const channelId = interaction.channelId;

  if (hasActiveGame(userId, channelId)) {
    await interaction.reply({
      content: '⚠️ You already have an active game! Use `/status` to see your progress or `/give-up` to start over.',
      ephemeral: true
    });
    return;
  }

  const game = startNewGame(userId, channelId);
  
  const embed = new EmbedBuilder()
    .setColor(0x6AAA64)
    .setTitle('🎮 Numericle - Daily Sequence Puzzle')
    .setDescription(`Welcome to today's puzzle: **${game.dailyPuzzleId.split('_')[0]}**\n\nGuess the 7-number sequence!`)
    .addFields(
      { name: '📊 Attempts', value: `0/${MAX_ATTEMPTS}`, inline: true },
      { name: '💡 Hints', value: `${MAX_HINTS} available`, inline: true },
      { name: '\u200B', value: '\u200B', inline: true }
    )
    .addFields(
      { name: '🟩 Green', value: 'Correct number, correct position', inline: true },
      { name: '🟨 Yellow', value: 'Correct number, wrong position', inline: true },
      { name: '⬜ Gray', value: 'Number not in sequence', inline: true }
    )
    .setFooter({ text: 'Use /guess to make your first guess!' });

  await interaction.reply({ embeds: [embed] });
}

async function handleGuess(interaction: any) {
  const userId = interaction.user.id;
  const channelId = interaction.channelId;

  if (!hasActiveGame(userId, channelId)) {
    await interaction.reply({
      content: '⚠️ No active game! Use `/numericle` to start a new game.',
      ephemeral: true
    });
    return;
  }

  const game = getGame(userId, channelId)!;

  if (game.isComplete) {
    await interaction.reply({
      content: '⚠️ This game is already complete! Use `/numericle` tomorrow for a new puzzle.',
      ephemeral: true
    });
    return;
  }

  const input = interaction.options.getString('numbers');
  const numbers = input.trim().split(/\s+/).map((n: string) => parseInt(n));

  if (numbers.length !== 7 || numbers.some(isNaN)) {
    await interaction.reply({
      content: '⚠️ Please enter exactly 7 numbers separated by spaces.\nExample: `/guess 1 2 3 4 5 6 7`',
      ephemeral: true
    });
    return;
  }

  const results = checkGuess(numbers, game.sequence);
  game.attempts.push(numbers);
  game.results.push(results);

  if (isWinningGuess(results)) {
    game.isWon = true;
    game.isComplete = true;
  } else if (game.results.length >= MAX_ATTEMPTS) {
    game.isComplete = true;
  }

  updateGame(userId, channelId, game);

  const embed = new EmbedBuilder()
    .setColor(game.isComplete ? (game.isWon ? 0x6AAA64 : 0xFF6B6B) : 0xC9B458)
    .setTitle(`Attempt ${game.results.length}/${MAX_ATTEMPTS}`)
    .setDescription(formatGuessDisplay(numbers, results));

  if (game.isComplete) {
    const ruleDesc = getRuleDescription(game.rule);
    embed.addFields(
      { name: game.isWon ? '🎉 You Won!' : '😔 Game Over', value: game.isWon ? `Solved in ${game.results.length} ${game.results.length === 1 ? 'guess' : 'guesses'}!` : 'Better luck tomorrow!' },
      { name: '✅ Solution', value: game.sequence.join(', ') },
      { name: '📖 Rule', value: ruleDesc }
    );
    embed.setFooter({ text: generateShareText(game.results, game.dailyPuzzleId, game.isWon, game.hintsUsed) });
  } else {
    embed.addFields(
      { name: '📊 Remaining', value: `${MAX_ATTEMPTS - game.results.length} attempts`, inline: true },
      { name: '💡 Hints', value: `${MAX_HINTS - game.hintsUsed} left`, inline: true }
    );
  }

  await interaction.reply({ embeds: [embed] });
}

async function handleHint(interaction: any) {
  const userId = interaction.user.id;
  const channelId = interaction.channelId;

  if (!hasActiveGame(userId, channelId)) {
    await interaction.reply({
      content: '⚠️ No active game! Use `/numericle` to start a new game.',
      ephemeral: true
    });
    return;
  }

  const game = getGame(userId, channelId)!;

  if (game.isComplete) {
    await interaction.reply({
      content: '⚠️ This game is already complete!',
      ephemeral: true
    });
    return;
  }

  if (game.hintsUsed >= MAX_HINTS) {
    await interaction.reply({
      content: '⚠️ No hints remaining!',
      ephemeral: true
    });
    return;
  }

  // Get positions that are already correctly guessed
  const correctlyGuessedIndices: number[] = [];
  if (game.results.length > 0) {
    const lastResults = game.results[game.results.length - 1];
    lastResults.forEach((result, index) => {
      if (result === 'correct') {
        correctlyGuessedIndices.push(index);
      }
    });
  }

  const availableIndices = Array.from({ length: 7 }, (_, i) => i)
    .filter(i => !game.revealedIndices.includes(i) && !correctlyGuessedIndices.includes(i));

  if (availableIndices.length === 0) {
    await interaction.reply({
      content: '⚠️ All positions are already revealed or correctly guessed!',
      ephemeral: true
    });
    return;
  }

  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  game.revealedIndices.push(randomIndex);
  game.hintsUsed++;

  updateGame(userId, channelId, game);

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle('💡 Hint Revealed!')
    .setDescription(`Position ${randomIndex + 1} is **${game.sequence[randomIndex]}**`)
    .addFields(
      { name: '💡 Hints Remaining', value: `${MAX_HINTS - game.hintsUsed}` }
    );

  await interaction.reply({ embeds: [embed] });
}

async function handleStatus(interaction: any) {
  const userId = interaction.user.id;
  const channelId = interaction.channelId;

  if (!hasActiveGame(userId, channelId)) {
    await interaction.reply({
      content: '⚠️ No active game! Use `/numericle` to start a new game.',
      ephemeral: true
    });
    return;
  }

  const game = getGame(userId, channelId)!;

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle('📊 Game Status')
    .setDescription(`Puzzle: **${game.dailyPuzzleId.split('_')[0]}**`)
    .addFields(
      { name: '📊 Attempts', value: `${game.results.length}/${MAX_ATTEMPTS}`, inline: true },
      { name: '💡 Hints Used', value: `${game.hintsUsed}/${MAX_HINTS}`, inline: true },
      { name: '🎮 Status', value: game.isComplete ? (game.isWon ? '✅ Won' : '❌ Lost') : '🎯 In Progress', inline: true }
    );

  if (game.revealedIndices.length > 0) {
    const hints = game.revealedIndices
      .map(i => `Position ${i + 1}: **${game.sequence[i]}**`)
      .join('\n');
    embed.addFields({ name: '💡 Revealed Hints', value: hints });
  }

  if (game.attempts.length > 0) {
    const lastGuess = game.attempts[game.attempts.length - 1];
    const lastResult = game.results[game.results.length - 1];
    embed.addFields({
      name: '🔍 Last Guess',
      value: formatGuessDisplay(lastGuess, lastResult)
    });
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}

async function handleGiveUp(interaction: any) {
  const userId = interaction.user.id;
  const channelId = interaction.channelId;

  if (!hasActiveGame(userId, channelId)) {
    await interaction.reply({
      content: '⚠️ No active game! Use `/numericle` to start a new game.',
      ephemeral: true
    });
    return;
  }

  const game = getGame(userId, channelId)!;

  if (game.isComplete) {
    await interaction.reply({
      content: '⚠️ This game is already complete!',
      ephemeral: true
    });
    return;
  }

  game.isComplete = true;
  game.isWon = false;
  updateGame(userId, channelId, game);

  const ruleDesc = getRuleDescription(game.rule);

  const embed = new EmbedBuilder()
    .setColor(0xFF6B6B)
    .setTitle('🏳️ Game Over')
    .setDescription('You gave up on this puzzle.')
    .addFields(
      { name: '✅ Solution', value: game.sequence.join(', ') },
      { name: '📖 Rule', value: ruleDesc },
      { name: '📊 Your Progress', value: `${game.results.length}/${MAX_ATTEMPTS} attempts used` }
    )
    .setFooter({ text: 'Come back tomorrow for a new puzzle!' });

  await interaction.reply({ embeds: [embed] });
}

async function handleRules(interaction: any) {
  const embed = new EmbedBuilder()
    .setColor(0x6AAA64)
    .setTitle('📖 How to Play Numericle')
    .setDescription('Guess the 7-number sequence in 10 attempts or less!')
    .addFields(
      { name: '🎯 Objective', value: 'Find the correct sequence of 7 numbers following a mathematical pattern.' },
      { name: '🟩 Green Square', value: 'Correct number in the correct position' },
      { name: '🟨 Yellow Square', value: 'Correct number but in the wrong position' },
      { name: '⬜ Gray Square', value: 'Number is not in the sequence' },
      { name: '💡 Hints', value: 'Use `/hint` to reveal one position (5 hints per game)' },
      { name: '📊 Commands', value: '`/numericle` - Start new game\n`/guess` - Make a guess\n`/hint` - Use a hint\n`/status` - Check progress\n`/give-up` - See solution' },
      { name: '🌍 Daily Puzzle', value: 'Everyone gets the same puzzle each day (resets at midnight GMT)' }
    )
    .setFooter({ text: 'Good luck! 🍀' });

  await interaction.reply({ embeds: [embed], ephemeral: true });
}

// Register slash commands
async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  
  try {
    console.log('🔄 Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commands }
    );
    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

registerCommands();
client.login(process.env.DISCORD_TOKEN);

import { SlashCommandBuilder } from 'discord.js';

export const commands = [
  new SlashCommandBuilder()
    .setName('numericle')
    .setDescription('Start a new Numericle game'),
  
  new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Make a guess for the sequence')
    .addStringOption(option =>
      option.setName('numbers')
        .setDescription('Enter 7 numbers separated by spaces (e.g., 1 2 3 4 5 6 7)')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('hint')
    .setDescription('Use a hint to reveal one position (5 hints per game)'),
  
  new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check your current game status'),
  
  new SlashCommandBuilder()
    .setName('give-up')
    .setDescription('Give up and see the solution'),
  
  new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Learn how to play Numericle')
].map(command => command.toJSON());

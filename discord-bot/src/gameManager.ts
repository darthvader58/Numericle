import type { GameState } from './types';
import { getDailyPuzzleId, generateDailyPuzzle } from './puzzleGenerator';

const activeGames = new Map<string, GameState>();

export function getGameKey(userId: string, channelId: string): string {
  return `${userId}-${channelId}`;
}

export function hasActiveGame(userId: string, channelId: string): boolean {
  const key = getGameKey(userId, channelId);
  const game = activeGames.get(key);
  if (!game) return false;
  
  // Check if it's today's puzzle
  const todayId = getDailyPuzzleId();
  return game.dailyPuzzleId === todayId;
}

export function getGame(userId: string, channelId: string): GameState | undefined {
  const key = getGameKey(userId, channelId);
  return activeGames.get(key);
}

export function startNewGame(userId: string, channelId: string): GameState {
  const puzzleId = getDailyPuzzleId();
  const puzzle = generateDailyPuzzle(puzzleId);
  
  const gameState: GameState = {
    userId,
    channelId,
    attempts: [],
    results: [],
    isComplete: false,
    isWon: false,
    dailyPuzzleId: puzzleId,
    hintsUsed: 0,
    revealedIndices: [],
    sequence: puzzle.sequence,
    rule: puzzle.rule
  };
  
  const key = getGameKey(userId, channelId);
  activeGames.set(key, gameState);
  
  return gameState;
}

export function updateGame(userId: string, channelId: string, gameState: GameState): void {
  const key = getGameKey(userId, channelId);
  activeGames.set(key, gameState);
}

export function deleteGame(userId: string, channelId: string): void {
  const key = getGameKey(userId, channelId);
  activeGames.delete(key);
}

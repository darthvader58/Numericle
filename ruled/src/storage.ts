import type { GameState } from './types';

const STORAGE_KEY = 'numericle_game_state';
const IP_STORAGE_KEY = 'numericle_ip_attempts';

export function saveGameState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGameState(): GameState | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export async function checkIPAttempt(puzzleId: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();
    
    const key = `${IP_STORAGE_KEY}_${puzzleId}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    
    if (attempts.includes(ip)) {
      return false;
    }
    
    attempts.push(ip);
    localStorage.setItem(key, JSON.stringify(attempts));
    return true;
  } catch {
    return true;
  }
}

export function hasPlayedToday(puzzleId: string): boolean {
  const state = loadGameState();
  return state !== null && state.dailyPuzzleId === puzzleId;
}

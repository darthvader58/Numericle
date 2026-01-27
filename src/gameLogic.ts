import type { GuessResult } from './types';

export function checkGuess(guess: number[], target: number[]): GuessResult[] {
  const results: GuessResult[] = [];
  
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      results.push('correct');
    } else if (target.includes(guess[i])) {
      results.push('present');
    } else {
      results.push('absent');
    }
  }
  
  return results;
}

export function isWinningGuess(results: GuessResult[]): boolean {
  return results.every(r => r === 'correct');
}

export function generateShareText(attempts: GuessResult[][], puzzleId: string, won: boolean): string {
  const emoji = attempts.map(attempt => 
    attempt.map(result => {
      if (result === 'correct') return '■';
      if (result === 'present') return '□';
      return '·';
    }).join('')
  ).join('\n');
  
  const status = won ? `${attempts.length}/10` : 'X/10';
  return `Numericle ${puzzleId}\n${status}\n\n${emoji}`;
}

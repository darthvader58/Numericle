import type { GuessResult } from './types';

export function checkGuess(guess: number[], target: number[]): GuessResult[] {
  const results: GuessResult[] = new Array(guess.length).fill('absent');
  const targetCounts = new Map<number, number>();
  
  // Count occurrences of each number in target
  target.forEach(num => {
    targetCounts.set(num, (targetCounts.get(num) || 0) + 1);
  });
  
  // First pass: mark all correct positions (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      results[i] = 'correct';
      targetCounts.set(guess[i], targetCounts.get(guess[i])! - 1);
    }
  }
  
  // Second pass: mark present positions (yellow) only if count allows
  for (let i = 0; i < guess.length; i++) {
    if (results[i] === 'absent' && targetCounts.has(guess[i])) {
      const count = targetCounts.get(guess[i])!;
      if (count > 0) {
        results[i] = 'present';
        targetCounts.set(guess[i], count - 1);
      }
    }
  }
  
  return results;
}

export function isWinningGuess(results: GuessResult[]): boolean {
  return results.every(r => r === 'correct');
}

export function formatGuessDisplay(guess: number[], results: GuessResult[]): string {
  return guess.map((num, i) => {
    const emoji = results[i] === 'correct' ? '🟩' : 
                  results[i] === 'present' ? '🟨' : '⬜';
    return `${emoji} \`${num.toString().padStart(2, ' ')}\``;
  }).join(' ');
}

export function generateShareText(attempts: GuessResult[][], puzzleId: string, won: boolean, hintsUsed: number = 0): string {
  const emoji = attempts.map(attempt => 
    attempt.map(result => {
      if (result === 'correct') return '🟩';
      if (result === 'present') return '🟨';
      return '⬜';
    }).join('')
  ).join('\n');
  
  const status = won ? `${attempts.length}/10` : 'X/10';
  const result = won ? 'You won! :)' : 'You lost :(';
  const hintsLine = hintsUsed > 0 ? ` (${hintsUsed} hint${hintsUsed > 1 ? 's' : ''})` : '';
  return `**Numericle ${puzzleId}**\n${result}\n${status}${hintsLine}\n\n${emoji}`;
}

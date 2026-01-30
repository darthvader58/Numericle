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
      // Decrease the count for this number
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

export function generateShareText(attempts: GuessResult[][], puzzleId: string, won: boolean, hintsUsed: number = 0, revealedIndices: number[] = []): string {
  // Track which positions were correctly guessed in each attempt
  const correctPositions = new Set<number>();
  
  const emoji = attempts.map(attempt => 
    attempt.map((result, index) => {
      // If this position was revealed by a hint AND not already correctly guessed, show blue
      if (revealedIndices.includes(index) && !correctPositions.has(index)) {
        return '🟦';
      }
      
      // Mark this position as correctly guessed for future rows
      if (result === 'correct') {
        correctPositions.add(index);
      }
      
      if (result === 'correct') return '🟩';
      if (result === 'present') return '🟨';
      return '⬜';
    }).join('')
  ).join('\n');
  
  const status = won ? `${attempts.length}/10` : 'X/10';
  const result = won ? 'You won! :)' : 'You lost :(';
  const hintsLine = hintsUsed > 0 ? ` (${hintsUsed} hint${hintsUsed > 1 ? 's' : ''})` : '';
  const advertise = 'Try out https://numericle.space now!'
  return `Numericle ${puzzleId}\n${result}\n${status}${hintsLine}\n\n${emoji}\n\n${advertise}`;
}

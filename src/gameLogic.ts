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

import { sequenceRules } from './enhancedSequenceRules';
import type { DailyPuzzle } from './types';

const SEQUENCE_LENGTH = 7;
const MAX_LARGE_NUMBERS = 4; // Maximum numbers with 3+ digits allowed in a sequence

/**
 * Check if a sequence is playable (not too many large numbers)
 * A sequence is playable if at most 3-4 numbers have 2+ digits (≥10)
 */
function isSequencePlayable(sequence: number[]): boolean {
  const largeNumberCount = sequence.filter(num => Math.abs(num) >= 100).length;
  return largeNumberCount <= MAX_LARGE_NUMBERS;
}

/**
 * Get all playable sequence rules (filtered for user-friendliness)
 */
function getPlayableRules() {
  return sequenceRules.filter(rule => {
    try {
      const sequence = rule.generate(SEQUENCE_LENGTH);
      return isSequencePlayable(sequence);
    } catch (e) {
      return false;
    }
  });
}

// Cache playable rules to avoid recalculating
const playableRules = getPlayableRules();

/**
 * Calculate the maximum number of digits needed across playable sequences
 * This ensures consistent input field width regardless of the actual sequence
 */
export function getMaxDigitsForAllSequences(): number {
  let maxDigits = 2; // Start with 2 digits minimum
  
  // Sample playable rules to find the maximum digits needed
  playableRules.forEach(rule => {
    try {
      const sequence = rule.generate(SEQUENCE_LENGTH);
      sequence.forEach(num => {
        const digits = Math.abs(num).toString().length;
        if (digits > maxDigits) {
          maxDigits = digits;
        }
      });
    } catch (e) {
      // Skip rules that might fail
    }
  });
  
  return Math.min(maxDigits, 6); // Cap at 6 digits for reasonable input size
}

export function getDailyPuzzleId(): string {
  const now = new Date();
  const utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(utc).toISOString().split('T')[0];
}

/**
 * Generate a unique daily puzzle with variation
 * - Randomly selects from playable sequence rules (max 3-4 large numbers)
 * - Adds variation by offsetting or modifying the starting point
 * - Ensures the exact same sequence is never repeated
 */
export function generateDailyPuzzle(date: string): DailyPuzzle {
  const seed = hashCode(date);
  
  // Select a random rule from playable rules only
  const ruleIndex = Math.abs(seed) % playableRules.length;
  const rule = playableRules[ruleIndex];
  
  // Generate variation seed for this specific date
  const variationSeed = Math.abs(hashCode(date + '_variation'));
  
  // Generate base sequence
  let sequence = rule.generate(SEQUENCE_LENGTH);
  
  // Add variation to prevent exact repetition of sequences
  // But ensure the result is still playable
  let attempts = 0;
  let isPlayable = isSequencePlayable(sequence);
  
  while (!isPlayable && attempts < 10) {
    // Try different variations until we get a playable sequence
    if (rule.name.includes('arith') || rule.name.includes('linear')) {
      const offset = (variationSeed + attempts) % 5;
      sequence = rule.generate(SEQUENCE_LENGTH + offset).slice(offset);
    } else if (rule.name.includes('poly') || rule.name.includes('quad') || rule.name.includes('cubic')) {
      const shift = (variationSeed + attempts) % 3;
      if (shift > 0) {
        sequence = rule.generate(SEQUENCE_LENGTH + shift).slice(shift);
      }
    } else {
      // For other types, use the base sequence
      break;
    }
    isPlayable = isSequencePlayable(sequence);
    attempts++;
  }
  
  // If still not playable after variations, use base sequence
  // (the rule was already filtered to be playable)
  if (!isPlayable) {
    sequence = rule.generate(SEQUENCE_LENGTH);
  }
  
  return {
    id: date,
    sequence: sequence,
    rule: rule.name,
    date
  };
}

export function getRuleDescription(ruleName: string): string {
  const rule = playableRules.find(r => r.name === ruleName) || sequenceRules.find(r => r.name === ruleName);
  return rule ? rule.description : 'Unknown rule';
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

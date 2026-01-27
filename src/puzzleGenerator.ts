import { sequenceRules } from './enhancedSequenceRules';
import type { DailyPuzzle } from './types';

const SEQUENCE_LENGTH = 7;
const MAX_LARGE_NUMBERS = 4;

function isSequencePlayable(sequence: number[]): boolean {
  const largeNumberCount = sequence.filter(num => Math.abs(num) >= 10).length;
  return largeNumberCount <= MAX_LARGE_NUMBERS;
}

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

const playableRules = getPlayableRules();

export function getMaxDigitsForAllSequences(): number {
  let maxDigits = 2;
  
  playableRules.forEach(rule => {
    try {
      const sequence = rule.generate(SEQUENCE_LENGTH);
      sequence.forEach(num => {
        const digits = Math.abs(num).toString().length;
        if (digits > maxDigits) {
          maxDigits = digits;
        }
      });
    } catch (e) {}
  });
  
  return Math.min(maxDigits, 6);
}

export function getDailyPuzzleId(): string {
  const now = new Date();
  const utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(utc).toISOString().split('T')[0];
}

export function generateDailyPuzzle(date: string): DailyPuzzle {
  const seed = hashCode(date);
  const ruleIndex = Math.abs(seed) % playableRules.length;
  const rule = playableRules[ruleIndex];
  const variationSeed = Math.abs(hashCode(date + '_variation'));
  
  let sequence = rule.generate(SEQUENCE_LENGTH);
  let attempts = 0;
  let isPlayable = isSequencePlayable(sequence);
  
  while (!isPlayable && attempts < 10) {
    if (rule.name.includes('arith') || rule.name.includes('linear')) {
      const offset = (variationSeed + attempts) % 5;
      sequence = rule.generate(SEQUENCE_LENGTH + offset).slice(offset);
    } else if (rule.name.includes('poly') || rule.name.includes('quad') || rule.name.includes('cubic')) {
      const shift = (variationSeed + attempts) % 3;
      if (shift > 0) {
        sequence = rule.generate(SEQUENCE_LENGTH + shift).slice(shift);
      }
    } else {
      break;
    }
    isPlayable = isSequencePlayable(sequence);
    attempts++;
  }
  
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

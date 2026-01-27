import { sequenceRules } from './sequenceRules';
import type { DailyPuzzle } from './types';

const SEQUENCE_LENGTH = 7;

export function getDailyPuzzleId(): string {
  const now = new Date();
  const utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(utc).toISOString().split('T')[0];
}

export function generateDailyPuzzle(date: string): DailyPuzzle {
  const seed = hashCode(date);
  const ruleIndex = Math.abs(seed) % sequenceRules.length;
  const rule = sequenceRules[ruleIndex];
  
  return {
    id: date,
    sequence: rule.generate(SEQUENCE_LENGTH),
    rule: rule.name,
    date
  };
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

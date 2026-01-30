import { sequenceRules } from './sequenceRules';
import type { DailyPuzzle } from './types';

export function getDailyPuzzleId(): string {
  const now = new Date();
  const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const year = utc.getFullYear();
  const month = String(utc.getMonth() + 1).padStart(2, '0');
  const day = String(utc.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}_v2`;
}

export function generateDailyPuzzle(puzzleId: string): DailyPuzzle {
  const seed = hashCode(puzzleId);
  const ruleIndex = Math.abs(seed) % sequenceRules.length;
  const rule = sequenceRules[ruleIndex];
  
  const sequence = rule.generate(7);
  
  return {
    id: puzzleId,
    sequence,
    rule: rule.name,
    date: puzzleId.split('_')[0]
  };
}

export function getRuleDescription(ruleName: string): string {
  const rule = sequenceRules.find(r => r.name === ruleName);
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

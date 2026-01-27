import { sequenceRules, difficultyLevels } from './enhancedSequenceRules';
import type { DailyPuzzle } from './types';

const SEQUENCE_LENGTH = 7;

export function getDailyPuzzleId(): string {
  const now = new Date();
  const utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(utc).toISOString().split('T')[0];
}

/**
 * Enhanced puzzle generation with difficulty progression
 * - Weekdays (Mon-Fri): Mix of easy-medium
 * - Weekends (Sat-Sun): Mix of medium-hard
 * - Special days: Expert challenges
 */
export function generateDailyPuzzle(date: string): DailyPuzzle {
  const seed = hashCode(date);
  const dayOfWeek = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
  const dayOfMonth = new Date(date).getDate();
  
  let availableRules: string[];
  
  // Special challenge on 1st of each month
  if (dayOfMonth === 1) {
    availableRules = difficultyLevels.expert;
  }
  // Weekend: Medium to Hard
  else if (dayOfWeek === 0 || dayOfWeek === 6) {
    availableRules = [...difficultyLevels.medium, ...difficultyLevels.hard];
  }
  // Weekdays: Easy to Medium
  else {
    availableRules = [...difficultyLevels.easy, ...difficultyLevels.medium];
  }
  
  // Select rule based on seed
  const ruleIndex = Math.abs(seed) % availableRules.length;
  const ruleName = availableRules[ruleIndex];
  const rule = sequenceRules.find(r => r.name === ruleName);
  
  if (!rule) {
    // Fallback to random rule if not found in difficulty list
    const fallbackIndex = Math.abs(seed) % sequenceRules.length;
    const fallbackRule = sequenceRules[fallbackIndex];
    return {
      id: date,
      sequence: fallbackRule.generate(SEQUENCE_LENGTH),
      rule: fallbackRule.name,
      date
    };
  }
  
  return {
    id: date,
    sequence: rule.generate(SEQUENCE_LENGTH),
    rule: rule.name,
    date
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

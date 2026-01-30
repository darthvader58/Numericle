export type SequenceRule = {
  name: string;
  generate: (length: number) => number[];
  description: string;
};

export type GuessResult = 'correct' | 'present' | 'absent';

export type GameState = {
  userId: string;
  channelId: string;
  attempts: number[][];
  results: GuessResult[][];
  isComplete: boolean;
  isWon: boolean;
  dailyPuzzleId: string;
  hintsUsed: number;
  revealedIndices: number[];
  sequence: number[];
  rule: string;
};

export type DailyPuzzle = {
  id: string;
  sequence: number[];
  rule: string;
  date: string;
};

export type SequenceRule = {
  name: string;
  generate: (length: number) => number[];
  description: string;
};

export type GuessResult = 'correct' | 'present' | 'absent';

export type GameState = {
  attempts: number[];
  results: GuessResult[][];
  isComplete: boolean;
  isWon: boolean;
  dailyPuzzleId: string;
  hintsUsed: number;
  revealedIndices: number[];
};

export type DailyPuzzle = {
  id: string;
  sequence: number[];
  rule: string;
  date: string;
};

export type UserStats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: { [key: number]: number };
  lastPlayedDate: string;
};

export type LeaderboardEntry = {
  username: string;
  gamesWon: number;
  currentStreak: number;
  averageGuesses: number;
  lastUpdated: string;
};

import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNewUserData {
  user_insert: User_Key;
}

export interface CreateNewUserVariables {
  username: string;
  email: string;
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

export interface GetLeaderboardData {
  leaderboardEntries: ({
    user: {
      username: string;
    };
      rank: number;
      score: number;
  })[];
}

export interface GetMyStatisticsData {
  statistics: ({
    currentWinStreak: number;
    longestWinStreak: number;
    totalGamesPlayed: number;
    totalGamesWon: number;
    updatedAt: TimestampString;
  })[];
}

export interface Guess_Key {
  id: UUIDString;
  __typename?: 'Guess_Key';
}

export interface LeaderboardEntry_Key {
  id: UUIDString;
  __typename?: 'LeaderboardEntry_Key';
}

export interface StartNewGameData {
  game_insert: Game_Key;
}

export interface StartNewGameVariables {
  difficultyLevel: string;
  maxAttempts: number;
  targetSequence: string;
}

export interface Statistic_Key {
  id: UUIDString;
  __typename?: 'Statistic_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  operationName: string;
}
export const createNewUserRef: CreateNewUserRef;

export function createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;
export function createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface GetMyStatisticsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyStatisticsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyStatisticsData, undefined>;
  operationName: string;
}
export const getMyStatisticsRef: GetMyStatisticsRef;

export function getMyStatistics(): QueryPromise<GetMyStatisticsData, undefined>;
export function getMyStatistics(dc: DataConnect): QueryPromise<GetMyStatisticsData, undefined>;

interface StartNewGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartNewGameVariables): MutationRef<StartNewGameData, StartNewGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: StartNewGameVariables): MutationRef<StartNewGameData, StartNewGameVariables>;
  operationName: string;
}
export const startNewGameRef: StartNewGameRef;

export function startNewGame(vars: StartNewGameVariables): MutationPromise<StartNewGameData, StartNewGameVariables>;
export function startNewGame(dc: DataConnect, vars: StartNewGameVariables): MutationPromise<StartNewGameData, StartNewGameVariables>;

interface GetLeaderboardRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLeaderboardData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLeaderboardData, undefined>;
  operationName: string;
}
export const getLeaderboardRef: GetLeaderboardRef;

export function getLeaderboard(): QueryPromise<GetLeaderboardData, undefined>;
export function getLeaderboard(dc: DataConnect): QueryPromise<GetLeaderboardData, undefined>;


import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { UserStats, GameState } from './types';

export async function createUser(userId: string, username: string, email: string): Promise<void> {
  if (!db) return;
  
  const userData = {
    username,
    email,
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {},
    lastPlayedDate: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  await setDoc(doc(db, 'users', userId), userData);
}

export async function saveUserStats(userId: string, stats: UserStats): Promise<void> {
  if (!db) return;
  
  const updateData = {
    ...stats,
    updatedAt: serverTimestamp()
  };
  
  await setDoc(doc(db, 'users', userId), updateData, { merge: true });
}

export async function getUserStats(userId: string): Promise<UserStats | null> {
  if (!db) return null;
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserStats;
  }
  
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {},
    lastPlayedDate: ''
  };
}

export async function updateStatsAfterGame(userId: string, gameState: GameState): Promise<void> {
  if (!db) return;
  const stats = await getUserStats(userId);
  if (!stats) return;

  stats.gamesPlayed += 1;
  
  if (gameState.isWon) {
    stats.gamesWon += 1;
    const guesses = gameState.results.length;
    stats.guessDistribution[guesses] = (stats.guessDistribution[guesses] || 0) + 1;
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (stats.lastPlayedDate === yesterday) {
      stats.currentStreak += 1;
    } else if (stats.lastPlayedDate !== today) {
      stats.currentStreak = 1;
    }
    
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  } else {
    stats.currentStreak = 0;
  }
  
  stats.lastPlayedDate = new Date().toISOString().split('T')[0];
  await saveUserStats(userId, stats);
}

export async function saveGameState(userId: string, gameState: GameState): Promise<void> {
  if (!db) return;
  
  const stateData = {
    ...gameState,
    updatedAt: serverTimestamp()
  };
  
  await setDoc(doc(db, 'gameStates', userId), stateData);
}

export async function loadGameState(userId: string): Promise<GameState | null> {
  if (!db) return null;
  
  const docRef = doc(db, 'gameStates', userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as GameState;
  }
  
  return null;
}

export async function submitFeedback(name: string, email: string, type: string, message: string): Promise<void> {
  if (!db) return;
  
  const feedbackData = {
    name: name || 'Anonymous',
    email: email || 'Not provided',
    type,
    message,
    timestamp: serverTimestamp(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  await addDoc(collection(db, 'feedback'), feedbackData);
}

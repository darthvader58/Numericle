import { doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { UserStats, LeaderboardEntry, GameState } from './types';

export async function saveUserStats(userId: string, stats: UserStats): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, 'users', userId), stats, { merge: true });
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

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, 'users'), orderBy('gamesWon', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as UserStats;
      const avgGuesses = data.gamesWon > 0 
        ? Object.entries(data.guessDistribution).reduce((sum, [guesses, count]) => 
            sum + (parseInt(guesses) * count), 0) / data.gamesWon
        : 0;
      
      return {
        username: doc.id,
        gamesWon: data.gamesWon,
        currentStreak: data.currentStreak,
        averageGuesses: Math.round(avgGuesses * 10) / 10,
        lastUpdated: data.lastPlayedDate
      };
    });
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

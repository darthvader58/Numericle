import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { createUser } from './database';

export async function signUpWithEmail(email: string, password: string, username: string): Promise<User> {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: username });
  
  // Create user document in Firestore
  await createUser(userCredential.user.uid, username, email);
  
  return userCredential.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signInWithGoogle(): Promise<User> {
  if (!auth || !googleProvider) throw new Error('Firebase not configured');
  const userCredential = await signInWithPopup(auth, googleProvider);
  
  // Create user document if it's a new user
  if (userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime) {
    const username = userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'User';
    await createUser(userCredential.user.uid, username, userCredential.user.email || '');
  }
  
  return userCredential.user;
}

export async function signOut(): Promise<void> {
  if (!auth) throw new Error('Firebase not configured');
  await firebaseSignOut(auth);
}

export function getCurrentUser(): User | null {
  return auth?.currentUser || null;
}

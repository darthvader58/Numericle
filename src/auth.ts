import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export async function signUpWithEmail(email: string, password: string, username: string): Promise<User> {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: username });
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
  return userCredential.user;
}

export async function signOut(): Promise<void> {
  if (!auth) throw new Error('Firebase not configured');
  await firebaseSignOut(auth);
}

export function getCurrentUser(): User | null {
  return auth?.currentUser || null;
}

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  return cred.user;
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const onAuthChange = (
  callback: (user: FirebaseUser | null) => void
) => onAuthStateChanged(auth, callback);

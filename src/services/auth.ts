import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  return signOut(auth);
};

export const updateUserProfile = async (displayName: string, photoURL?: string) => {
  if (!auth.currentUser) throw new Error('No user logged in');
  return updateProfile(auth.currentUser, {
    displayName,
    photoURL
  });
};
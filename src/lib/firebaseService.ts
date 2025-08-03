import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  qrCode: string;
  expertise: string[];
  experience: {
    role: string;
    company: string;
    period: string;
  }[];
  contact: {
    email: string;
    phone: string;
  };
  social: {
    linkedin: string;
    github?: string;
    portfolio: string;
  };
}

// Upload image to Firebase Storage
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// Save profile data to Firestore
export const saveProfileData = async (profileData: ProfileData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'profiles'), {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving profile data:', error);
    throw error;
  }
};

// Save profile data with custom ID
export const saveProfileDataWithId = async (id: string, profileData: ProfileData): Promise<void> => {
  try {
    await setDoc(doc(db, 'profiles', id), {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving profile data:', error);
    throw error;
  }
}; 
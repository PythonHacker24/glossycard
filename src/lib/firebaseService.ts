import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  qrCode: string;
  paymentLink?: string;
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
    instagram?: string;
    twitter?: string;
    youtube?: string;
    medium?: string;
    meeting?: string;
    resume?: string;
  };
}

export interface PaymentData {
  walletName: string;
  paymentQR: string;
  payLink: string;
  business: {
    name: string;
    company: string;
    description: string;
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

// Upload image to public directory via API
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Save profile data to Firestore
export const saveProfileData = async (profileData: ProfileData): Promise<string> => {
  try {
    // Check if Firebase is properly initialized
    if (!db) {
      throw new Error('Firebase database is not initialized. Check your environment variables.');
    }
    
    console.log('Attempting to save profile data to Firestore...');
    const docRef = await addDoc(collection(db, 'profiles'), {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Profile saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving profile data:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('Firebase error: Missing or insufficient permissions. Please check your Firestore security rules.');
      } else if (error.message.includes('unavailable')) {
        throw new Error('Firebase error: Service unavailable. Please check your internet connection and Firebase project status.');
      } else if (error.message.includes('not-found')) {
        throw new Error('Firebase error: Database not found. Please check your Firebase project configuration.');
      }
    }
    
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

// Fetch profile data from Firestore by ID
export const getProfileData = async (id: string): Promise<ProfileData | null> => {
  try {
    // Check if Firebase is properly initialized
    if (!db) {
      throw new Error('Firebase database is not initialized. Check your environment variables.');
    }
    
    // Check if we're online
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }
    
    console.log('Attempting to fetch profile data from Firestore...');
    console.log('Document ID:', id);
    
    const docRef = doc(db, 'profiles', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Profile data fetched successfully');
      return data as ProfileData;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('Firebase error: Missing or insufficient permissions. Please check your Firestore security rules.');
      } else if (error.message.includes('unavailable') || error.message.includes('offline')) {
        throw new Error('Firebase error: Service unavailable or offline. Please check your internet connection and Firebase project status.');
      } else if (error.message.includes('not-found')) {
        throw new Error('Firebase error: Database not found. Please check your Firebase project configuration.');
      } else if (error.message.includes('No internet connection')) {
        throw new Error('No internet connection. Please check your network and try again.');
      } else if (error.message.includes('Firebase database is not initialized')) {
        throw new Error('Firebase configuration error. Please check your environment variables.');
      }
    }
    
    throw error;
  }
}; 

// Fetch payment data from Firestore by ID
export const getPaymentData = async (id: string): Promise<PaymentData | null> => {
  try {
    if (!db) {
      throw new Error('Firebase database is not initialized. Check your environment variables.');
    }
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }
    const docRef = doc(db, 'payments', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PaymentData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching payment data:', error);
    throw error;
  }
}; 
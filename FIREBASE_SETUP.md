# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "procards")
4. Follow the setup wizard

## 2. Enable Services

### Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

### Storage
1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode" (for development)
4. Select the same location as Firestore

## 3. Get Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web app icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the configuration object

## 4. Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. Security Rules (Optional)

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{profileId} {
      allow read, write: if true; // For development - change for production
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{allPaths=**} {
      allow read, write: if true; // For development - change for production
    }
  }
}
```

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the form and submit
3. Check Firebase Console to see the data being saved

## Data Structure

The form data will be converted to this format in Firebase:

```javascript
{
  name: "Sarah Chen",
  title: "Senior Product Designer", 
  location: "San Francisco, CA",
  avatar: "https://firebasestorage.googleapis.com/...",
  bio: "Passionate about creating intuitive user experiences...",
  qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  expertise: ["UI/UX Design", "Product Strategy", "Design Systems"],
  experience: [
    {
      role: "Senior Product Designer",
      company: "TechCorp", 
      period: "2021-2024"
    }
  ],
  contact: {
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567"
  },
  social: {
    linkedin: "https://linkedin.com/in/sarahchen",
    portfolio: "https://sarahchen.design"
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
``` 
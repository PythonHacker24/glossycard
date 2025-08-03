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

**Note**: We're not using Firebase Storage. Images are stored locally in `/public/uploads/` directory.

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

## 6. Image Upload System

Images are uploaded to `/public/uploads/` directory with the following process:

1. User selects an image file
2. File is sent to `/api/upload` endpoint
3. Original filename is hashed using MD5 + timestamp
4. File is saved as `<hash>.<extension>` in `/public/uploads/`
5. URL `/uploads/<hash>.<extension>` is stored in Firebase

Example:
- Original filename: `profile-photo.jpg`
- Hashed filename: `a1b2c3d4e5f678901234567890123456.jpg`
- Stored URL: `/uploads/a1b2c3d4e5f678901234567890123456.jpg`

## 7. Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the form and upload an image
3. Check Firebase Console to see the data being saved
4. Check `/public/uploads/` directory for uploaded images

## Data Structure

The form data will be converted to this format in Firebase:

```javascript
{
  name: "Sarah Chen",
  title: "Senior Product Designer", 
  location: "San Francisco, CA",
  avatar: "/uploads/a1b2c3d4e5f678901234567890123456.jpg", // Local file path
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
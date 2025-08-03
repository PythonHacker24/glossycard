# Firebase Setup Guide for Vercel Deployment

## Issue: "Failed to get document because the client is offline"

This error typically occurs when Firebase isn't properly configured for the client-side environment in Vercel. Here's how to fix it:

## 1. Check Environment Variables in Vercel

Make sure all these environment variables are set in your Vercel project:

### Required Environment Variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### How to set them in Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add each variable with the exact name above
5. Make sure they're set for "Production", "Preview", and "Development"
6. Redeploy your project

## 2. Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you don't have a web app, click "Add app" and choose "Web"
7. Copy the configuration object

## 3. Verify Firebase Project Settings

### Firestore Rules
Make sure your Firestore security rules allow read access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{document} {
      allow read: if true;  // Allow public read access
      allow write: if true; // Allow public write access (adjust as needed)
    }
  }
}
```

### Authentication (if needed)
If you're using authentication, make sure your domain is added to authorized domains in Firebase Console.

## 4. Check Network Connectivity

The error might also occur if:
- Your Firebase project is in a region that's not accessible
- There are network restrictions
- The Firebase project is paused or disabled

## 5. Debug Steps

1. **Check Browser Console**: Look for any Firebase initialization errors
2. **Verify Environment Variables**: Add this to your component temporarily to debug:

```javascript
useEffect(() => {
  console.log('Firebase Config Check:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Missing',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Missing',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set' : 'Missing',
  });
}, []);
```

3. **Test Locally**: Make sure it works in development first
4. **Check Vercel Logs**: Look at the deployment logs for any errors

## 6. Common Solutions

### Solution 1: Redeploy After Setting Environment Variables
After setting environment variables in Vercel, you must redeploy:
1. Go to your Vercel project
2. Click "Deployments"
3. Click "Redeploy" on your latest deployment

### Solution 2: Clear Browser Cache
Sometimes cached configurations can cause issues:
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Try a different browser

### Solution 3: Check Firebase Project Status
1. Go to Firebase Console
2. Check if your project is active
3. Verify billing status (if applicable)

## 7. Alternative: Use Firebase Config Directly

If environment variables continue to cause issues, you can temporarily hardcode the config (NOT recommended for production):

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 8. Final Checklist

- [ ] All environment variables are set in Vercel
- [ ] Environment variables are set for all environments (Production, Preview, Development)
- [ ] Project has been redeployed after setting environment variables
- [ ] Firebase project is active and accessible
- [ ] Firestore rules allow read access
- [ ] No network restrictions blocking Firebase
- [ ] Browser console shows no Firebase initialization errors

## 9. Still Having Issues?

If you're still experiencing issues:
1. Check the Vercel deployment logs
2. Verify your Firebase project is in a supported region
3. Consider creating a new Firebase project for testing
4. Contact Vercel support if the issue persists 
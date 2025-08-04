# Firebase Analytics Setup Guide

This document explains how Firebase Analytics has been integrated into your ProCards application.

## Overview

Firebase Analytics has been fully integrated to track user engagement, application performance, and business metrics across all pages and components.

## Features Implemented

### 1. Analytics Service (`src/lib/analytics.ts`)
- **Comprehensive Event Tracking**: Tracks 20+ different event types
- **Error Handling**: Graceful fallback when analytics is not available
- **Type Safety**: Full TypeScript support with enum-based event types
- **Privacy Compliant**: No PII collected without consent

### 2. Tracked Events

#### Page Views
- Landing page views
- Profile card views
- Create card page views
- Discover page views
- Analytics dashboard views

#### User Interactions
- Button clicks (create card, contact actions)
- Form submissions
- Search queries
- File uploads
- Social link clicks

#### Business Metrics
- Card creations
- Profile views
- Contact actions (email, phone, meeting)
- QR code generations
- Image uploads (success/failure)

#### Error Tracking
- Profile creation failures
- Image upload errors
- Firebase connection issues
- Form validation errors

### 3. Components with Analytics

#### Profile Card (`src/components/procard.tsx`)
- Profile view tracking
- Contact action tracking (email, phone, meeting)
- Social link click tracking
- QR code generation tracking
- Print action tracking

#### Create Card Page (`src/app/create-card/page.tsx`)
- Form submission tracking
- File upload tracking
- Card creation success/failure tracking
- Error tracking with context

#### Landing Page (`src/components/landing.tsx`)
- Page view tracking
- CTA button click tracking
- Navigation tracking

#### Discover Page (`src/components/discover.tsx`)
- Page view tracking
- Search query tracking
- Talent profile click tracking

#### Upload API (`src/app/api/upload/route.ts`)
- Image upload success/failure tracking
- File size and type tracking

## Configuration

### 1. Firebase Setup
Ensure your Firebase project has Analytics enabled:

1. Go to Firebase Console
2. Select your project
3. Navigate to Analytics section
4. Enable Google Analytics for Firebase

### 2. Environment Variables
Make sure these environment variables are set:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Configuration (`src/lib/firebase.ts`)
Analytics is automatically initialized when:
- Running in browser environment
- Firebase is properly configured
- Analytics is supported in the environment

## Usage

### Basic Event Tracking
```typescript
import { logAnalyticsEvent, AnalyticsEvent } from '@/lib/analytics';

// Log a custom event
logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
  action: 'create_card_clicked',
  location: 'landing_page'
});
```

### Page View Tracking
```typescript
import { logPageView } from '@/lib/analytics';

// Log page view
logPageView('Landing Page', '/');
```

### Error Tracking
```typescript
import { logError } from '@/lib/analytics';

// Log error with context
logError('profile_creation_failed', error.message, {
  form_data: { has_photo: true, skills_count: 3 }
});
```

## Analytics Dashboard

Access the analytics dashboard at `/analytics` to:
- View analytics status
- See tracked events
- Get setup instructions
- Check privacy compliance

## Privacy & Compliance

### Data Collection
- **Anonymous Tracking**: No PII collected by default
- **Consent-Based**: User consent required for detailed tracking
- **GDPR Compliant**: Follows privacy regulations
- **Transparent**: Clear documentation of data collection

### Data Retention
- Firebase Analytics handles data retention
- Default retention period: 14 months
- Configurable in Firebase Console

## Monitoring & Debugging

### Console Logging
All analytics events are logged to console for debugging:
```javascript
// Example console output
Analytics event logged: button_click { action: 'create_card_clicked', location: 'landing_page' }
```

### Firebase Console
View real-time and historical data in Firebase Console:
1. Go to Analytics section
2. View Events tab for custom events
3. Check User Properties for user segmentation
4. Create custom reports and dashboards

### Error Handling
Analytics failures don't break the application:
- Graceful fallback when analytics is unavailable
- Console warnings for debugging
- No impact on user experience

## Best Practices

### 1. Event Naming
- Use consistent naming conventions
- Include relevant parameters
- Avoid PII in event names

### 2. Parameter Usage
- Keep parameters under 25 per event
- Use meaningful parameter names
- Include context when helpful

### 3. Performance
- Analytics calls are non-blocking
- Events are batched for efficiency
- Minimal impact on app performance

### 4. Testing
- Test analytics in development
- Verify events in Firebase Console
- Check console logs for debugging

## Troubleshooting

### Analytics Not Working
1. Check Firebase configuration
2. Verify environment variables
3. Check browser console for errors
4. Ensure Analytics is enabled in Firebase project

### Events Not Appearing
1. Check network connectivity
2. Verify event parameters
3. Check Firebase Console filters
4. Allow time for data processing (up to 24 hours)

### Performance Issues
1. Check for excessive event logging
2. Review event parameters
3. Monitor network requests
4. Consider event batching

## Future Enhancements

### Planned Features
- Real-time analytics dashboard
- Custom event reporting
- User segmentation
- A/B testing integration
- Conversion funnel tracking

### Advanced Analytics
- Cohort analysis
- User journey mapping
- Predictive analytics
- Machine learning insights

## Support

For analytics-related issues:
1. Check this documentation
2. Review Firebase Analytics documentation
3. Check browser console for errors
4. Verify Firebase project configuration

## Resources

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Privacy Best Practices](https://firebase.google.com/docs/analytics/privacy) 
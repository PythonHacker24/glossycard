import { analytics } from './firebase';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';

// Analytics event types
export enum AnalyticsEvent {
  // Page views
  PAGE_VIEW = 'page_view',
  
  // Profile interactions
  PROFILE_VIEW = 'profile_view',
  PROFILE_SHARE = 'profile_share',
  PROFILE_PRINT = 'profile_print',
  
  // Contact actions
  EMAIL_CLICK = 'email_click',
  PHONE_CLICK = 'phone_click',
  MEETING_SCHEDULE = 'meeting_schedule',
  
  // Social links
  LINKEDIN_CLICK = 'linkedin_click',
  GITHUB_CLICK = 'github_click',
  PORTFOLIO_CLICK = 'portfolio_click',
  RESUME_CLICK = 'resume_click',
  
  // QR Code
  QR_CODE_GENERATED = 'qr_code_generated',
  QR_CODE_SCANNED = 'qr_code_scanned',
  
  // Card creation
  CARD_CREATED = 'card_created',
  CARD_EDITED = 'card_edited',
  CARD_DELETED = 'card_deleted',
  
  // Image upload
  IMAGE_UPLOADED = 'image_uploaded',
  IMAGE_UPLOAD_FAILED = 'image_upload_failed',
  
  // Errors
  ERROR_OCCURRED = 'error_occurred',
  
  // User engagement
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  SEARCH_PERFORMED = 'search_performed'
}

// Analytics service class
class AnalyticsService {
  private isEnabled: boolean = false;

  constructor() {
    // Check if analytics is available
    if (analytics) {
      this.isEnabled = true;
      console.log('Analytics service initialized');
    } else {
      console.warn('Analytics not available');
    }
  }

  // Log a custom event
  logEvent(eventName: AnalyticsEvent, parameters?: Record<string, string | number | boolean>) {
    if (!this.isEnabled || !analytics) {
      console.log(`Analytics event (disabled): ${eventName}`, parameters);
      return;
    }

    try {
      // Convert our enum to string for Firebase Analytics
      logEvent(analytics, eventName as string, parameters);
      console.log(`Analytics event logged: ${eventName}`, parameters);
    } catch (error) {
      console.error('Failed to log analytics event:', error);
    }
  }

  // Log page view
  logPageView(pageName: string, pagePath?: string) {
    this.logEvent(AnalyticsEvent.PAGE_VIEW, {
      page_name: pageName,
      page_path: pagePath || window.location.pathname,
      page_title: document.title
    });
  }

  // Log profile view
  logProfileView(profileId: string, profileName: string) {
    this.logEvent(AnalyticsEvent.PROFILE_VIEW, {
      profile_id: profileId,
      profile_name: profileName,
      timestamp: new Date().toISOString()
    });
  }

  // Log profile share
  logProfileShare(profileId: string, shareMethod: string) {
    this.logEvent(AnalyticsEvent.PROFILE_SHARE, {
      profile_id: profileId,
      share_method: shareMethod,
      timestamp: new Date().toISOString()
    });
  }

  // Log contact action
  logContactAction(action: 'email' | 'phone' | 'meeting', profileId: string) {
    const eventMap = {
      email: AnalyticsEvent.EMAIL_CLICK,
      phone: AnalyticsEvent.PHONE_CLICK,
      meeting: AnalyticsEvent.MEETING_SCHEDULE
    };

    this.logEvent(eventMap[action], {
      profile_id: profileId,
      timestamp: new Date().toISOString()
    });
  }

  // Log social link click
  logSocialClick(platform: 'linkedin' | 'github' | 'portfolio' | 'resume', profileId: string) {
    const eventMap = {
      linkedin: AnalyticsEvent.LINKEDIN_CLICK,
      github: AnalyticsEvent.GITHUB_CLICK,
      portfolio: AnalyticsEvent.PORTFOLIO_CLICK,
      resume: AnalyticsEvent.RESUME_CLICK
    };

    this.logEvent(eventMap[platform], {
      profile_id: profileId,
      platform,
      timestamp: new Date().toISOString()
    });
  }

  // Log QR code generation
  logQRCodeGenerated(profileId: string) {
    this.logEvent(AnalyticsEvent.QR_CODE_GENERATED, {
      profile_id: profileId,
      timestamp: new Date().toISOString()
    });
  }

  // Log card creation
  logCardCreated(profileId: string, hasAvatar: boolean, expertiseCount: number) {
    this.logEvent(AnalyticsEvent.CARD_CREATED, {
      profile_id: profileId,
      has_avatar: hasAvatar,
      expertise_count: expertiseCount,
      timestamp: new Date().toISOString()
    });
  }

  // Log image upload
  logImageUpload(success: boolean, fileSize?: number, errorMessage?: string) {
    const eventName = success ? AnalyticsEvent.IMAGE_UPLOADED : AnalyticsEvent.IMAGE_UPLOAD_FAILED;
    const parameters: Record<string, string | number | boolean> = {
      timestamp: new Date().toISOString()
    };

    if (fileSize) parameters.file_size = fileSize;
    if (errorMessage) parameters.error_message = errorMessage;

    this.logEvent(eventName, parameters);
  }

  // Log error
  logError(errorType: string, errorMessage: string, context?: Record<string, string | number | boolean>) {
    const parameters: Record<string, string | number | boolean> = {
      error_type: errorType,
      error_message: errorMessage,
      timestamp: new Date().toISOString()
    };

    if (context) {
      // Flatten context object into parameters
      Object.entries(context).forEach(([key, value]) => {
        parameters[`context_${key}`] = value;
      });
    }

    this.logEvent(AnalyticsEvent.ERROR_OCCURRED, parameters);
  }

  // Set user ID (if you implement authentication later)
  setUserId(userId: string) {
    if (!this.isEnabled || !analytics) return;

    try {
      setUserId(analytics, userId);
    } catch (error) {
      console.error('Failed to set user ID:', error);
    }
  }

  // Set user properties
  setUserProperties(properties: Record<string, string | number | boolean>) {
    if (!this.isEnabled || !analytics) return;

    try {
      setUserProperties(analytics, properties);
    } catch (error) {
      console.error('Failed to set user properties:', error);
    }
  }

  // Check if analytics is enabled
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Export convenience functions
export const logAnalyticsEvent = (eventName: AnalyticsEvent, parameters?: Record<string, string | number | boolean>) => {
  analyticsService.logEvent(eventName, parameters);
};

export const logPageView = (pageName: string, pagePath?: string) => {
  analyticsService.logPageView(pageName, pagePath);
};

export const logProfileView = (profileId: string, profileName: string) => {
  analyticsService.logProfileView(profileId, profileName);
};

export const logContactAction = (action: 'email' | 'phone' | 'meeting', profileId: string) => {
  analyticsService.logContactAction(action, profileId);
};

export const logSocialClick = (platform: 'linkedin' | 'github' | 'portfolio' | 'resume', profileId: string) => {
  analyticsService.logSocialClick(platform, profileId);
};

export const logQRCodeGenerated = (profileId: string) => {
  analyticsService.logQRCodeGenerated(profileId);
};

export const logCardCreated = (profileId: string, hasAvatar: boolean, expertiseCount: number) => {
  analyticsService.logCardCreated(profileId, hasAvatar, expertiseCount);
};

export const logImageUpload = (success: boolean, fileSize?: number, errorMessage?: string) => {
  analyticsService.logImageUpload(success, fileSize, errorMessage);
};

export const logError = (errorType: string, errorMessage: string, context?: Record<string, string | number | boolean>) => {
  analyticsService.logError(errorType, errorMessage, context);
}; 
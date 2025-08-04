'use client'

import React, { useState, useEffect } from 'react';
import { analyticsService } from '@/lib/analytics';

interface AnalyticsData {
  totalPageViews: number;
  totalProfileViews: number;
  totalCardCreations: number;
  totalImageUploads: number;
  totalErrors: number;
  recentEvents: Array<{
    event: string;
    timestamp: string;
    data?: any;
  }>;
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalPageViews: 0,
    totalProfileViews: 0,
    totalCardCreations: 0,
    totalImageUploads: 0,
    totalErrors: 0,
    recentEvents: []
  });

  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if analytics is enabled
    setIsAnalyticsEnabled(analyticsService.isAnalyticsEnabled());
    
    // In a real application, you would fetch analytics data from Firebase Analytics
    // For now, we'll show a placeholder dashboard
    console.log('Analytics Dashboard: Analytics enabled:', analyticsService.isAnalyticsEnabled());
  }, []);

  if (!isAnalyticsEnabled) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Analytics Status</h2>
          <p className="text-yellow-700">
            Firebase Analytics is not enabled or not properly configured. 
            Please check your Firebase configuration and ensure Analytics is enabled in your Firebase project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Track user engagement and application performance
        </p>
      </div>

      {/* Analytics Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          <span className="text-green-800 font-medium">Analytics is active and collecting data</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalPageViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Profile Views</p>
              <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalProfileViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cards Created</p>
              <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalCardCreations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Image Uploads</p>
              <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalImageUploads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Information</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tracked Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Page Views</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Profile Views</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span>Card Creations</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span>Image Uploads</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span>Contact Actions (Email, Phone, Meeting)</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                  <span>Social Link Clicks</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span>QR Code Generations</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                  <span>Error Tracking</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How to View Analytics</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Go to your Firebase Console</li>
              <li>Navigate to Analytics section</li>
              <li>View real-time and historical data</li>
              <li>Create custom reports and dashboards</li>
              <li>Set up alerts for important events</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy & Compliance</h3>
            <p className="text-sm text-gray-600">
              Analytics data is collected anonymously and complies with privacy regulations. 
              No personally identifiable information is tracked without explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Phone, Calendar, FileText, Printer, Package, MapPin, Linkedin, Github, ExternalLink, QrCode, X, Loader2, Instagram, Twitter, Youtube, PencilIcon, CreditCardIcon } from 'lucide-react';
import QRCode from 'qrcode';
import { ProfileData } from '@/lib/firebaseService';
import { logProfileView, logContactAction, logSocialClick, logQRCodeGenerated, logAnalyticsEvent, AnalyticsEvent } from '@/lib/analytics';

interface ProfileCardProps {
  profileData?: ProfileData | null;
  isLoading?: boolean;
  error?: string | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData, isLoading = false, error = null }) => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  useEffect(() => {
    console.log('Firebase Config Check:', {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Missing',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Missing',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set' : 'Missing',
    });
    console.log('Network Status:', navigator.onLine ? 'Online' : 'Offline');
  }, []);

  // Log profile view when profile data is loaded
  useEffect(() => {
    if (profileData && !isLoading && !error) {
      // Extract profile ID from URL or use a fallback
      const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
      logProfileView(profileId, profileData.name);
    }
  }, [profileData, isLoading, error]);

  const generateQRCode = async () => {
    try {
      const url = window.location.href;
      const qrDataURL = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataURL(qrDataURL);
      setShowQRModal(true);
      
      // Log QR code generation
      const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
      logQRCodeGenerated(profileId);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <X className="w-8 h-8 mx-auto mb-4 text-red-400" />
            <p className="text-red-500 mb-2">Error loading profile</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!profileData) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Package className="w-8 h-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 mb-2">Profile not found</p>
            <p className="text-gray-400 text-sm">The profile you&apos;re looking for doesn&apos;t exist</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* Header with QR Code */}
      <div className="relative bg px-6 bg-white pt-6 pb-4">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-full overflow-hidden">
              {profileData.avatar && profileData.avatar !== "/api/placeholder/120/120" ? (
                <Image 
                  src={profileData.avatar} 
                  alt={profileData.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <button onClick={generateQRCode}
              className="flex items-center justify-center p-1 text-gray-700 transition-colors">
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
          <p className="text-gray-600 font-medium mb-2">{profileData.title}</p>
          <p className="text-gray-500 text-sm mb-4 flex items-center justify-center">
            <span className="mr-1"><MapPin className="w-4 h-4" /></span>
            {profileData.location}
          </p>
        </div>

        {/* Bio */}
        <p className="text-gray-500 text-sm text-center leading-relaxed px-2">
          {profileData.bio}
        </p>
      </div>

      <div className="px-6 py-6 bg-white">
        {/* Expertise */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profileData.expertise.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Experience</h2>
          <div className="space-y-3">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600 text-xs">{exp.company}</p>
                </div>
                <span className="font-bold text-gray-500 text-xs">{exp.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Email and Call */}
          <div className="grid grid-cols-2 gap-3">
            {profileData.contact.email && (
              <a 
                href={`mailto:${profileData.contact.email}`}
                onClick={() => {
                  const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                  logContactAction('email', profileId);
                }}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-900 hover:bg-gray-50 transition-colors text-sm font-bold"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            )}
            {profileData.contact.phone && (
              <a 
                href={`tel:${profileData.contact.phone}`}
                onClick={() => {
                  const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                  logContactAction('phone', profileId);
                }}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-bold"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </a>
            )}
          </div>

          {/* Schedule Meeting */}
          {profileData.social.meeting && (
            <a 
              href={profileData.social.meeting}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logContactAction('meeting', profileId);
              }}
              className="w-full flex items-center justify-center px-3 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-sm font-bold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </a>
          )}

          {/* Resume and Print */}
          <div className="grid grid-cols-2 gap-3">
            {profileData.social.resume && (
              <a 
                href={profileData.social.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                  logSocialClick('resume', profileId);
                }}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-bold"
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume
              </a>
            )}
            <button 
              onClick={() => {
                window.print();
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logAnalyticsEvent(AnalyticsEvent.PROFILE_PRINT, { profile_id: profileId });
              }}
              className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-bold"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
          </div>

          {/* Payment Link */}
          {profileData.paymentLink && (
            <a 
              href={profileData.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logContactAction('payment', profileId);
              }}
              className="w-full flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-bold"
            >
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Make Payment
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
          {profileData.social.linkedin && (
            <a 
              href={profileData.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('linkedin', profileId);
              }}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profileData.social.github && (
            <a 
              href={profileData.social.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('github', profileId);
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {profileData.social.portfolio && (
            <a 
              href={profileData.social.portfolio} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('portfolio', profileId);
              }}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {profileData.social.instagram && (
            <a 
              href={profileData.social.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('instagram', profileId);
              }}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {profileData.social.twitter && (
            <a 
              href={profileData.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('twitter', profileId);
              }}
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {profileData.social.youtube && (
            <a 
              href={profileData.social.youtube} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('youtube', profileId);
              }}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          )}
          {profileData.social.medium && (
            <a 
              href={profileData.social.medium} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                const profileId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'unknown' : 'unknown';
                logSocialClick('medium', profileId);
              }}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-stone-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">QR Code</h3>
              <button 
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center mb-4">
              {qrCodeDataURL && (
                <Image 
                  src={qrCodeDataURL} 
                  alt="QR Code" 
                  width={192}
                  height={192}
                  className="w-48 h-48 border border-gray-200 rounded-lg"
                />
              )}
            </div>
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code to share this profile
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
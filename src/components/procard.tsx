'use client'

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, FileText, Printer, Package, MapPin, Linkedin, Github, ExternalLink, QrCode, X } from 'lucide-react';
import QRCode from 'qrcode';

const ProfileCard = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  // Generate QR code for current URL
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
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Placeholder data structure - ready for Firebase integration
  const profileData = {
    name: "Sarah Chen",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    avatar: "/api/placeholder/120/120", // Placeholder for profile image
    bio: "Passionate about creating intuitive user experiences that bridge the gap between user needs and business goals. 5+ years of design expertise.",
    qrCode: "/api/placeholder/40/40", // Placeholder for QR code
    expertise: [
      "UI/UX Design",
      "Product Strategy", 
      "Design Systems",
      "User Research",
      "Prototyping",
      "Figma"
    ],
    experience: [
      {
        role: "Senior Product Designer",
        company: "TechCorp",
        period: "2021-2024"
      },
      {
        role: "UX Designer", 
        company: "StartupXYZ",
        period: "2019-2021"
      },
      {
        role: "Junior Designer",
        company: "Creative Agency", 
        period: "2017-2019"
      }
    ],
    contact: {
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567"
    },
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      portfolio: "https://sarahchen.design"
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* Header with QR Code */}
      <div className="relative bg px-6 bg-white pt-6 pb-4">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SC</span>
              </div>
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
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-900 hover:bg-gray-50 transition-colors text-sm font-bold">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </button>
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-bold">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </button>
          </div>

          {/* Schedule Meeting */}
          <button className="w-full flex items-center justify-center px-3 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-sm font-bold">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </button>

          {/* Resume and Print */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-bold">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </button>
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-bold">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
          <a href={profileData.social.linkedin} className="text-gray-600 hover:text-blue-600 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={profileData.social.github} className="text-gray-600 hover:text-gray-900 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href={profileData.social.portfolio} className="text-gray-600 hover:text-blue-600 transition-colors">
            <ExternalLink className="w-5 h-5" />
          </a>
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
                <img 
                  src={qrCodeDataURL} 
                  alt="QR Code" 
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
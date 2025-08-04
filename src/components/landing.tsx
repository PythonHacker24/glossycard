'use client'

import React, { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, Share2, Star, ArrowRight, Zap, Shield, Clock, Globe } from 'lucide-react';
import ProfileCard from './procard';
import { useRouter } from 'next/navigation';
import { getProfileData, ProfileData } from '@/lib/firebaseService';
import { logPageView, logAnalyticsEvent, AnalyticsEvent } from '@/lib/analytics';

export default function DigitalCardsLanding() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Log page view
  useEffect(() => {
    logPageView('Landing Page', '/');
  }, []);

  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "College Placements",
      description: "Stand out in campus interviews with professional digital cards that showcase your skills dynamically"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Off-Campus Opportunities", 
      description: "Network globally and apply to companies worldwide with instantly shareable professional profiles"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "No More Forms",
      description: "Skip repetitive job application forms - one card contains everything recruiters need"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Instant Referrals",
      description: "Get referrals faster by sharing your complete professional story in seconds"
    }
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, title: "Lightning Fast", desc: "Share your profile in under 2 seconds" },
    { icon: <Shield className="w-5 h-5" />, title: "Always Updated", desc: "Real-time sync across all platforms" },
    { icon: <Clock className="w-5 h-5" />, title: "Save 5+ Hours", desc: "Per job application cycle" },
    { icon: <Users className="w-5 h-5" />, title: "95% Response Rate", desc: "From recruiters and hiring managers" }
  ];

  const testimonials = [
    {
      name: "Ayan Choradia",
      role: "Tapir Money",
      content: "Gloss Card helps with all my endavours of cold maling and reaching out clients to grow our startup",
      rating: 5
    },
    {
      name: "Aditya Patil", 
      role: "GSoC'25 Emory BMI and Product Builder",
      content: "I use Gloss Card everyday to reach out potential clients and spread my products around",
      rating: 5
    },
    {
      name: "Utkarsh Maurya",
      role: "Embedded Engineer at Cypherrock",
      content: "Gloss Card helps me network better when I am reaching out people online as well as offline",
      rating: 5
    }
  ];

  function getstarted() {
    if (router) {
      logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
        action: 'create_card_clicked',
        location: 'landing_page'
      });
      router.push("/create-card");
    }
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const id =  "Ha2hSiG2gtpFNfzddBsc";
      if (!id) {
        setError('No profile ID provided');
        return;
      }

      const data = await getProfileData(id);
      setProfileData(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div className="text-3xl text-black">
            Gloss Card
          </div>
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-black transition-colors">Benefits</a>
            <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors">Reviews</a>
          </div>
                      <button 
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium" 
              onClick={() => {
                logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
                  action: 'header_create_clicked',
                  location: 'header'
                });
                getstarted();
              }}
            >
              Create
            </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl mb-6 text-black leading-tight">
            Sharing Your Digital Card
            <br />
            Made Simple
          </h1>
          <p className="text-xs md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create stunning digital cards that land you jobs. No more filling forms, no more outdated resumes. 
            Just one powerful card that opens doors to your dream career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center group" 
              onClick={() => {
                logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
                  action: 'hero_create_clicked',
                  location: 'hero_section'
                });
                getstarted();
              }}
            >
              Create Your Card Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
          <div className="mt-12 text-sm text-gray-500">
            Trusted by 50,000+ students and professionals
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-black">
            Why Choose Gloss Cards?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index 
                      ? 'bg-white shadow-lg border-2 border-black' 
                      : 'bg-white border border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${activeFeature === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-black">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Card Preview */}
            <div className="relative">
              <div className="relative overflow-hidden">
                <ProfileCard 
                  profileData={profileData}
                  isLoading={isLoading}
                  error={error}
                />
                <div className="absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-black">
            Supercharge Your Job Hunt
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-black group-hover:text-white transition-all text-gray-600">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-black">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">&apos;{testimonial.content}&apos;</p>
                <div>
                  <div className="font-semibold text-black text-sm">{testimonial.name}</div>
                  <div className="text-gray-500 text-xs">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-lg mb-4 text-black">
                Gloss Card
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Empowering careers through innovative digital networking solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-black">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-black">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Career Tips</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-black">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2025 Gloss Card. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
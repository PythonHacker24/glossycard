'use client'

import React, { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, Share2, Star, ArrowRight, Zap, Shield, Clock, Globe, Handshake, User, ChartLine } from 'lucide-react';
import ProfileCard from './procard';
import GlossCardPaymentComponent from './payment';
import { useRouter } from 'next/navigation';
import { getPaymentData, getProfileData, PaymentData, ProfileData } from '@/lib/firebaseService';
import { logPageView, logAnalyticsEvent, AnalyticsEvent } from '@/lib/analytics';
import Image from 'next/image';

export default function DigitalCardsLanding() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll-based header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past initial 100px
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Log page view
  useEffect(() => {
    logPageView('Landing Page', '/');
  }, []);

  const features = [
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Always Make a Memorable First Impression",
      description: "Share a sleek, interactive card that tells your full story, instantly and professionally."
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Never Lose a Lead Again", 
      description: "Keep all connections organized with context, notes, and follow-up reminders."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Update Once, Share Forever",
      description: "Your details stay current across every card you've shared. No reprints, no outdated info."
    },
    {
      icon: <ChartLine className="w-6 h-6" />,
      title: "Track Your Networking Impact",
      description: "See who viewed your card, when, and where so you can follow up at the perfect moment."
    }
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, title: "Lightning Fast", desc: "Share your profile in under 2 seconds" },
    { icon: <Shield className="w-5 h-5" />, title: "Always Updated", desc: "Real-time sync across all platforms" },
    { icon: <Clock className="w-5 h-5" />, title: "Save Multiple Hours", desc: "Per application/forms cycle" },
    { icon: <Users className="w-5 h-5" />, title: "Better Response Rate", desc: "From recruiters and hiring managers" }
  ];

  const testimonials = [
    {
      name: "Ayan Choradia",
      role: "Engineer at Tapir Money",
      content: "Gloss Card helps with all my endavours of cold mailing and reaching out clients",
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
      router.push("/signup");
    }
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  // const [profileerror, setProfileError] = useState<string | null>(null);

  const fetchProfileData = async () => {
    try {
      setIsProfileLoading(true);
      setError(null);
      
      const id =  "XmXCscpw3DIltAC4SHbn";
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
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setIsPaymentLoading(true);
        setError(null);
        const id =  "adityapatil";
        if (!id) {
          setError('No payment ID provided');
          return;
        }
        const data = await getPaymentData(id);
        if (data) {
          setPaymentData(data);
        } else {
          setError('No payment data found for this ID');
        }
      } catch (err) {
        console.error('Error fetching payment data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load payment data');
      } finally {
        setIsPaymentLoading(false);
      }
    };
    fetchPaymentData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl max-w-7xl w-[95%] mx-auto transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="text-3xl text-black">
            Gloss Card
          </div>
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-black transition-colors">Benefits</a>
            <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors">Reviews</a>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="bg-transparent text-gray-900 px-6 py-2 rounded-lg border-1 hover:bg-gray-200 transition-colors text-lg font-medium" 
              onClick={() => {
                logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
                  action: 'header_payments_card_clicked',
                  location: 'header'
                });
                router.push('/login');
              }}
            >
              Login
            </button>
            <button 
              className="bg-black text-white px-10 py-2 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium" 
              onClick={() => {
                logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
                  action: 'header_create_clicked',
                  location: 'header'
                });
                getstarted();
              }}
            >
            Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-white pt-28">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl mb-4 text-black leading-tight">
            First impressions aren&apos;t given,
            <br />
            they&apos;re taken
          </h1>
          <p className="text-xs md:text-xl mb-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The future of connections fits in your pocket with <span className='text-xs md:text-xl mb-6 text-black max-w-3xl mx-auto leading-relaxed'>digital business cards</span>
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
          <div className="mt-10 text-sm text-gray-500">
            Trusted by the best professionals in the city
          </div>
        </div>
      </section>

      {/* Problems with Paper Cards Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl text-black leading-tight">
                The Problem with
                <br />
                Paper Business Cards
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Traditional business cards are becoming obsolete in our digital world. Here&apos;s what market research reveals:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800 font-medium">Estimates range from 88% to 92% of business cards ending up in the trash within a week.</p>
                    <p className="text-gray-500 text-sm mt-1">Out of 10 billion cards printed annually, 8 billion are thrown out within the first week.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800 font-medium">90% of clients in professional services industries prefer digital interaction when asking questions about their account and business transactions.</p>
                    <p className="text-gray-500 text-sm mt-1">63% of millennials prefer digital over traditional business cards for their ease of use and eco-friendliness.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800 font-medium">On average, companies spend $64.23 per employee on business cards each year.</p>
                    <p className="text-gray-500 text-sm mt-1">Another estimate suggests that the average company spends between $100 and $2,300 per person annually on traditional business cards.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800 font-medium">The inability to update contact information in real-time with traditional business cards can lead to missed connections.</p>
                    <p className="text-gray-500 text-sm mt-1">An outdated business card says more about your past than your potential go digital and let your first impression be future proof.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 rounded-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Image 
                      src="/scattered-cards.png"
                      alt='scattered cards'
                      layout='fill'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-3 text-black">
            Introducting Gloss Cards
          </h2>
          <p className='text-center text-gray-600 mb-16'>Share Professional Portfolio Cards</p>
          
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
                  isLoading={isProfileLoading}
                  error={error}
                />
                <div className="absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-3 text-black">
            Detailed Metrics to Drive Growth
          </h2>
          <p className='text-center text-gray-600 mb-16'>Get detailed performance analysis of cards</p>
          
          <div className="grid gap-12 items-center">
            {/* Interactive Card Preview */}
            <div className="relative">
              <div className="relative overflow-hidden">
                <Image 
                  src="/dashboard.png"
                  alt="Dashboard preview"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-3 text-black">
            Business Payments Made Simple
          </h2>
          <p className='text-center text-gray-600 mb-16'>Send Professional Payment Cards</p>
          
          <div className="grid gap-12 items-center">
            {/* Interactive Card Preview */}
            <div className="relative">
              <div className="relative overflow-hidden">
              <GlossCardPaymentComponent
                walletName={paymentData?.walletName || ''}
                paymentQR={paymentData?.paymentQR || ''}
                payLink={paymentData?.payLink || ''}
                business={paymentData?.business || {
                  name: '',
                  company: '',
                  description: '',
                  phone: '',
                  email: '',
                  website: '',
                  address: '',
                }}
                isLoading={isPaymentLoading}
                error={error}
              />
                <div className="absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-black">
            Supercharge Your Networking
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
      <section id="testimonials" className="py-20 px-6 bg-white">
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
      <footer className="py-12 px-6 border-gray-200 bg-white">
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
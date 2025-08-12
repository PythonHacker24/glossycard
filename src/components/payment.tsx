import React, { useEffect } from 'react';
import Image from 'next/image';
import { Phone, Mail, Globe, MapPin, CheckCircle, BriefcaseBusinessIcon } from 'lucide-react';
import { logPageView, logContactAction, logAnalyticsEvent, AnalyticsEvent } from '@/lib/analytics';

interface BusinessInfo {
  name: string;
  company: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

interface GlossCardPaymentComponentProps {
  walletName: string;
  paymentQR: string;
  payLink: string;
  business: BusinessInfo;
  isLoading?: boolean;
  error?: string | null;
}

const GlossCardPaymentComponent: React.FC<GlossCardPaymentComponentProps> = ({
  walletName,
  paymentQR,
  payLink,
  business,
  isLoading = false,
  error = null,
}) => {
  // Log page view when component mounts
  useEffect(() => {
    if (!isLoading && !error) {
      logPageView('Payment Page', '/payments/[id]');
      logAnalyticsEvent(AnalyticsEvent.PAGE_VIEW, {
        page_name: 'Payment Page',
        business_name: business.name,
        business_company: business.company,
        wallet_name: walletName
      });
    }
  }, [isLoading, error, business.name, business.company, walletName]);

  // Log error analytics when error occurs
  useEffect(() => {
    if (error) {
      logAnalyticsEvent(AnalyticsEvent.ERROR_OCCURRED, {
        error_type: 'payment_page_error',
        error_message: error,
        business_name: business.name,
        business_company: business.company
      });
    }
  }, [error, business.name, business.company]);

  // Handle payment link click
  const handlePaymentLinkClick = () => {
    logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
      button_type: 'payment_link',
      business_name: business.name,
      business_company: business.company,
      wallet_name: walletName
    });
  };

  // Handle contact action clicks
  const handleContactAction = (action: 'email' | 'phone' | 'website') => {
    if (action === 'email' || action === 'phone') {
      logContactAction(action, business.name);
    }
    logAnalyticsEvent(AnalyticsEvent.BUTTON_CLICK, {
      button_type: `contact_${action}`,
      business_name: business.name,
      business_company: business.company
    });
  };

  // Handle QR code interaction
  const handleQRCodeInteraction = () => {
    logAnalyticsEvent(AnalyticsEvent.QR_CODE_SCANNED, {
      business_name: business.name,
      business_company: business.company,
      wallet_name: walletName
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="rounded-2xl shadow-sm max-w-4xl w-full overflow-hidden border-1">
          <div className="px-8 py-6 bg-white border-b-1">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-4xl text-black mt-3">Loading Payment Card...</h1>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">Please wait while we load your payment details</p>
          </div>
          <div className="bg-white p-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <p className="text-gray-500 text-lg">Loading payment details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="rounded-2xl shadow-sm max-w-4xl w-full overflow-hidden border-1">
          <div className="px-8 py-6 bg-white border-b-1">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-4xl text-black mt-3">Error Loading Payment Card</h1>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">Unable to load payment details</p>
          </div>
          <div className="bg-white p-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M12 8v4m0 4h.01" className="opacity-75" />
                </svg>
                <p className="text-red-500 mb-2 text-lg">Error loading payment details</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-10">
      <div className="rounded-2xl shadow-sm max-w-4xl w-full overflow-hidden border-1">
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b-1">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-4xl text-black mt-3">{business.company}&apos;s Payment Card</h1>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">Digital Payments Card Managed by {business.name}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - QR Code */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl text-gray-800 ml-2">Scan to Pay</h2>
              </div>
              {/* QR Code Container */}
              <div className="relative">
                <div className="bg-white p-6 rounded-xl border-1 shadow-sm">
                <span className="block w-full text-center text-gray-800 text-lg tracking-wide mb-3">{walletName}</span>
                  {/* QR Code Placeholder */}
                  <div 
                    className="w-48 h-48 bg-white border-1 rounded-lg flex items-center justify-center relative overflow-hidden pb-4 cursor-pointer"
                    onClick={handleQRCodeInteraction}
                    title="Click to track QR code interaction"
                  >
                    <Image 
                        src={paymentQR} 
                        alt={business.name}
                        fill
                        className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <a
                href={payLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold text-sm shadow hover:bg-gray-800 transition-colors"
                onClick={handlePaymentLinkClick}
              >
                Pay via Link
              </a>
            </div>

            {/* Right Column - Business Information */}
            <div>
              <h2 className="text-xl text-gray-800 mb-3">Business Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{business.name}</h3>
                  <h4 className="text-xl text-gray-700 font-medium mb-3">{business.company}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {business.description}
                  </p>
                </div>
                {/* Contact Details */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <BriefcaseBusinessIcon className="w-5 h-5 text-gray-600" />
                    <h4 className="text-lg font-semibold text-gray-800">Contact Details</h4>
                  </div>
                  <div className="space-y-3">
                    <div 
                      className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      onClick={() => handleContactAction('phone')}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{business.phone}</span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      onClick={() => handleContactAction('email')}
                    >
                      <Mail className="w-4 h-4" />
                      <span>{business.email}</span>
                    </div>
                    <a 
                      href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => handleContactAction('website')}
                    >
                      <Globe className="w-4 h-4" />
                      <span>{business.website}</span>
                    </a>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{business.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Terms & Conditions</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              • All payments are processed by the QR code provided by the user themselves
              <br />
              • Gloss Card is only displays the information creator of this card provided
              <br />
              • For any problems & queries, contact the owner themselves
              <br />
              • Gloss Card takes no responsibility of the information displayed here
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-8 py-4 border-t-1">
          <p className="text-center text-gray-500 text-sm">
            Powered by <a href='https://glosscard.space' className='font-bold'>Gloss Card</a> • Premium Digital Cards Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlossCardPaymentComponent;
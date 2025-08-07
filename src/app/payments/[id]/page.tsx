'use client'

import GlossCardPaymentComponent from "@/components/payment";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPaymentData, PaymentData } from '@/lib/firebaseService';
import { logAnalyticsEvent, AnalyticsEvent } from '@/lib/analytics';

export default function Payment() {
  const params = useParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const id = params.id as string;
        if (!id) {
          setError('No payment ID provided');
          return;
        }
        const data = await getPaymentData(id);
        if (data) {
          setPaymentData(data);
          // Log successful payment page load
          logAnalyticsEvent(AnalyticsEvent.PAGE_VIEW, {
            page_name: 'Payment Page',
            payment_id: id,
            business_name: data.business.name,
            business_company: data.business.company,
            wallet_name: data.walletName
          });
        } else {
          setError('No payment data found for this ID');
          // Log payment not found
          logAnalyticsEvent(AnalyticsEvent.ERROR_OCCURRED, {
            error_type: 'payment_not_found',
            error_message: 'No payment data found for this ID',
            payment_id: id
          });
        }
      } catch (err) {
        console.error('Error fetching payment data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load payment data';
        setError(errorMessage);
        // Log payment fetch error
        logAnalyticsEvent(AnalyticsEvent.ERROR_OCCURRED, {
          error_type: 'payment_fetch_error',
          error_message: errorMessage,
          payment_id: params.id as string
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaymentData();
  }, [params.id]);

  return (
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
      isLoading={isLoading}
      error={error}
    />
  );
}
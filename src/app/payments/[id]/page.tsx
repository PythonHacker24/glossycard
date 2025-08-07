'use client'

import GlossCardPaymentComponent from "@/components/payment";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPaymentData, PaymentData } from '@/lib/firebaseService';

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
        } else {
          setError('No payment data found for this ID');
        }
      } catch (err) {
        console.error('Error fetching payment data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load payment data');
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
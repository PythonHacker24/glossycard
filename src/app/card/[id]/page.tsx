'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileCard from "@/components/procard";
import { getProfileData, ProfileData } from '@/lib/firebaseService';

export default function CardPage() {
  const params = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const id = params.id as string;
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

    fetchProfileData();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-10 p-8">
      <div className="w-full max-w-md">
        <ProfileCard 
          profileData={profileData}
          isLoading={isLoading}
          error={error}
        />
        <div className="text-center text-sm text-gray-400 mt-4">
          Made with <a href="https://glosscard.space"><span className="text-black font-bold">Gloss Card</span></a>
        </div>
      </div>
    </div>
  );
}
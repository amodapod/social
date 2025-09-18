// hooks/useOnboardingCheck.ts
'use client';

import { useEffect } from 'react';
import { useUser } from '@/contexts/user-context';
import { useOnboarding } from '@/contexts/onboarding-context';

export function useOnboardingCheck() {
  const { user, loading: userLoading } = useUser();
  const { startOnboarding } = useOnboarding();

  useEffect(() => {
    console.log('useOnboardingCheck - userLoading:', userLoading, 'user:', user);
    
    if (userLoading) {
      console.log('useOnboardingCheck - Still loading user, skipping check');
      return;
    }

    if (!user) {
      console.log('useOnboardingCheck - No user, skipping onboarding check');
      return;
    }

    const checkOnboardingStatus = async () => {
      console.log('useOnboardingCheck - Checking onboarding status...');
      try {
        const response = await fetch('/api/onboarding/status');
        console.log('useOnboardingCheck - Status response:', response.status);
        
        if (!response.ok) {
          console.error('useOnboardingCheck - Error response:', response.statusText);
          return;
        }
        
        const data = await response.json();
        console.log('useOnboardingCheck - Onboarding status:', data);
        
        if (!data.isComplete) {
          console.log('useOnboardingCheck - Starting onboarding flow');
          startOnboarding();
        } else {
          console.log('useOnboardingCheck - Onboarding already completed');
        }
      } catch (error) {
        console.error('useOnboardingCheck - Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [user, userLoading, startOnboarding]);
}
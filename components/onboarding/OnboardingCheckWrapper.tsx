'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useOnboarding } from '@/contexts/onboarding-context';

export function OnboardingCheckWrapper() {
  const { user } = useAuth();
  const { startOnboarding } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    // This will be called from a server action
    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch('/api/onboarding/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to check onboarding status');
        }

        const { requiresOnboarding } = await response.json();
        if (requiresOnboarding) {
          startOnboarding();
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [user, startOnboarding, router]);

  return null;
}

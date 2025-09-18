// components/onboarding/OnboardingCheck.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useOnboarding } from '@/contexts/onboarding-context';
import { inngest } from '@/lib/inngest/client';

interface OnboardingEvent {
  data: {
    userId: string;
  };
}

export function OnboardingCheck(): JSX.Element | null {
  const { user } = useAuth();
  const { startOnboarding } = useOnboarding();

  useEffect(() => {
    if (!user) return;

    // Start the onboarding check
    const checkOnboarding = async (): Promise<void> => {
      try {
        await inngest.send({
          name: 'onboarding/check',
          data: { userId: user.id },
        });
      } catch (error) {
        console.error('Error sending onboarding check event:', error);
      }
    };

    checkOnboarding();

    // Set up event listeners for onboarding steps
    const handleSocialLinkingRequired = (event: OnboardingEvent): void => {
      if (event.data.userId === user.id) {
        startOnboarding();
      }
    };

    const handlePlanSelectionRequired = (event: OnboardingEvent): void => {
      if (event.data.userId === user.id) {
        startOnboarding();
      }
    };

    // In a real app, you would set up WebSocket listeners here
    // For now, we'll use a polling mechanism as a fallback
    const pollInterval = setInterval(checkOnboarding, 30000); // Check every 30 seconds

    // Cleanup on unmount
    return (): void => {
      clearInterval(pollInterval);
    };
  }, [user, startOnboarding]);

  return null;
}
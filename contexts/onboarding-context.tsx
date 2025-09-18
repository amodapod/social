// contexts/onboarding-context.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';
import { SocialLinkingStep } from '@/components/onboarding/SocialLinkingStep';
import { PlanSelectionStep } from '@/components/onboarding/PlanSelectionStep';
import { OnboardingComplete } from '@/components/onboarding/OnboardingComplete';
import { inngest } from '@/lib/inngest/client-side';

type OnboardingStep = 'social' | 'plan' | 'complete' | null;

interface OnboardingContextType {
  isOpen: boolean;
  currentStep: OnboardingStep;
  nextStep: () => void;
  prevStep: () => void;
  closeOnboarding: () => void;
  startOnboarding: () => void;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Set initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const startOnboarding = () => {
    console.log('startOnboarding called, user:', user);
    // Check user's current progress
    if (user) {
      console.log('User is logged in, starting onboarding with social step');
      setCurrentStep('social');
    } else {
      console.log('No user, starting onboarding with social step');
      setCurrentStep('social');
    }
    console.log('Setting isOpen to true');
    setIsOpen(true);
  };

  // Debug effect to log state changes
  useEffect(() => {
    console.log('Onboarding state - isOpen:', isOpen, 'currentStep:', currentStep);
  }, [isOpen, currentStep]);

  const nextStep = () => {
    if (currentStep === 'social') {
      setCurrentStep('plan');
    } else if (currentStep === 'plan') {
      setCurrentStep('complete');
      // Close the modal after a short delay when complete
      setTimeout(() => {
        setIsOpen(false);
        setCurrentStep(null);
      }, 1500);
    }
  };

  const prevStep = () => {
    if (currentStep === 'plan') {
      setCurrentStep('social');
    }
  };

  const closeOnboarding = () => {
    setIsOpen(false);
    // Reset to first step when closing
    setCurrentStep('social');
  };

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOpen,
        currentStep,
        nextStep,
        prevStep,
        closeOnboarding,
        startOnboarding,
        isLoading,
      }}
    >
      {children}
      <OnboardingModal />
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// Onboarding Modal Component
function OnboardingModal() {
  const { isOpen, currentStep, nextStep, prevStep, closeOnboarding } = useOnboarding();
  
  console.log('OnboardingModal - isOpen:', isOpen, 'currentStep:', currentStep);

  if (!isOpen) {
    console.log('OnboardingModal - Not rendering because isOpen is false');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <button
          onClick={closeOnboarding}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          {currentStep === 'social' && <SocialLinkingStep onNext={nextStep} />}
          {currentStep === 'plan' && <PlanSelectionStep onNext={nextStep} onBack={prevStep} />}
          {currentStep === 'complete' && <OnboardingComplete />}
        </div>
      </div>
    </div>
  );
}
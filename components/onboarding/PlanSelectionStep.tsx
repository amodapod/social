'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

interface PlanSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

type BillingInterval = 'monthly' | 'yearly';

interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  cta: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for new creators',
    features: [
      'Basic analytics',
      '1 social account',
      'Email support',
      'Basic reporting'
    ],
    prices: {
      monthly: 9,
      yearly: 90
    },
    cta: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing creators',
    features: [
      'Advanced analytics',
      'Up to 3 social accounts',
      'Priority support',
      'Advanced reporting',
      'Competitor analysis'
    ],
    prices: {
      monthly: 29,
      yearly: 290
    },
    cta: 'Go Pro',
    popular: true
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'For agencies and professionals',
    features: [
      'All Pro features',
      'Unlimited social accounts',
      '24/7 priority support',
      'Dedicated account manager',
      'Custom reporting',
      'API access'
    ],
    prices: {
      monthly: 99,
      yearly: 990
    },
    cta: 'Contact Sales'
  }
];

export function PlanSelectionStep({ onNext, onBack }: PlanSelectionStepProps) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (planId: string) => {
    try {
      setIsLoading(true);
      setSelectedPlan(planId);
      
      // In a real app, this would redirect to Stripe checkout
      // For now, we'll just simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Success!',
        description: 'Your subscription has been set up successfully!',
      });
      
      onNext();
      
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: 'Error',
        description: 'Failed to process subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBillingInterval = () => {
    setBillingInterval(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  };

  const saveYearly = (plan: Plan) => {
    return Math.round((plan.prices.monthly * 12 - plan.prices.yearly) / plan.prices.monthly / 12 * 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Select the plan that's right for you. Start with a free trial, no credit card required.
        </p>
      </div>

      <div className="flex justify-center my-4">
        <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              billingInterval === 'monthly' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              billingInterval === 'yearly' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div 
            key={plan.id}
            className={`relative rounded-xl border p-6 ${
              plan.popular 
                ? 'border-2 border-primary dark:border-primary/50 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{plan.description}</p>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">
                ${billingInterval === 'monthly' ? plan.prices.monthly : plan.prices.yelly}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                /{billingInterval === 'monthly' ? 'month' : 'year'}
              </span>
              {billingInterval === 'yearly' && (
                <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                  Save {saveYearly(plan)}%
                </span>
              )}
            </div>
            
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Icons.check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              onClick={() => handleSubscribe(plan.id)}
              className="w-full"
              variant={plan.popular ? 'default' : 'outline'}
              disabled={isLoading && selectedPlan === plan.id}
            >
              {isLoading && selectedPlan === plan.id ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                plan.cta
              )}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}

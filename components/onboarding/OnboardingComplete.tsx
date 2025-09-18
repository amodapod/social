'use client';

import { Icons } from '@/components/icons';

export function OnboardingComplete() {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <Icons.check className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="mt-4 text-2xl font-bold">You're all set!</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Your account is ready. Redirecting to your dashboard...
      </p>
      <div className="mt-6">
        <Icons.spinner className="mx-auto h-8 w-8 animate-spin text-gray-400" />
      </div>
    </div>
  );
}

// app/layout.tsx
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { OnboardingProvider } from '@/contexts/onboarding-context';
import { UserProvider } from '@/contexts/user-context';
import { OnboardingCheck } from '@/components/onboarding/OnboardingCheck';
import { InngestProvider } from 'inngest/next';
import { inngest } from '@/lib/inngest/client';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InngestProvider client={inngest}>
          <AuthProvider>
            <UserProvider>
              <OnboardingProvider>
                <OnboardingCheck />
                {children}
              </OnboardingProvider>
            </UserProvider>
          </AuthProvider>
        </InngestProvider>
      </body>
    </html>
  );
}
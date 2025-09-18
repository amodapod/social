import { serve } from 'inngest/next';
import { inngestServer } from '@/lib/inngest/server-config';
import { syncYouTubeAnalytics } from './functions/youtube-sync';
import { 
  checkOnboardingStatus, 
  handleSocialConnected 
} from './functions/onboarding-flow';

// Export the Inngest API using the v3 format
export const { GET, POST, PUT } = serve({
  client: inngestServer,
  functions: [
    syncYouTubeAnalytics,
    checkOnboardingStatus,
    handleSocialConnected,
  ],
  // Development server configuration
  signingKey: process.env.INNGEST_SIGNING_KEY,
  // Base URL for the Inngest API
  ...(process.env.NODE_ENV === 'development' && {
    baseUrl: 'http://localhost:3000/api/inngest'
  })
});

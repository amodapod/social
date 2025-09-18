// This file contains server-side only Inngest functions
import { inngest } from './client';
import { createClient } from '@supabase/supabase-js';

export const serverFunctions = [
  inngest.createFunction(
    { id: 'check-onboarding-status' },
    { event: 'onboarding/check' },
    async ({ event, step }) => {
      const { userId } = event.data;
      
      // Initialize Supabase client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      // Check if user has any social connections
      const { count: connectionCount, error: connectionError } = await supabase
        .from('user_connections')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (connectionError) {
        console.error('Error checking user connections:', connectionError);
        throw connectionError;
      }

      // Add your logic here
      return { status: 'completed', userId };
    }
  ),
  // Add other server-side functions here
];

// Export the functions for use in API routes
export * from './functions';

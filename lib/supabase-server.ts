import { createClient } from '@supabase/supabase-js';
import getConfig from 'next/config';

// This function should only be used in server-side code
export function createServerSupabaseClient() {
  // Get the runtime config
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  
  // Debug: Log the configs to see what's being loaded
  console.log('publicRuntimeConfig:', JSON.stringify(publicRuntimeConfig, null, 2));
  console.log('serverRuntimeConfig keys:', Object.keys(serverRuntimeConfig));
  
  // Try getting the service role key from different possible locations
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || publicRuntimeConfig.supabaseUrl;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || serverRuntimeConfig.supabaseServiceRoleKey;

  console.log('Using Supabase URL:', supabaseUrl ? '***' : 'Not set');
  console.log('Using Supabase Service Role Key:', supabaseKey ? '***' : 'Not set');

  if (!supabaseUrl) {
    throw new Error('Supabase URL is not set. Please set NEXT_PUBLIC_SUPABASE_URL in your .env file');
  }
  if (!supabaseKey) {
    console.error('Environment variables available:', Object.keys(process.env).join(', '));
    throw new Error('Supabase service role key is not set. Please set SUPABASE_SERVICE_ROLE_KEY in your .env file');
  }

  return createClient(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

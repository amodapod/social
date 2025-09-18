import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest/client';
import { serverFunctions } from '@/lib/inngest/server';

// Create an API that serves server-side Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: serverFunctions,
  streaming: 'allow',
});

// Ensure this route is not statically generated
export const dynamic = 'force-dynamic';

// Set the runtime to nodejs since we're using Node.js APIs
export const runtime = 'nodejs';

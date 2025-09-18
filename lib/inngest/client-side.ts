// This is a client-side only version of the Inngest client
import { Inngest } from 'inngest';

// This is a minimal client that can be used in the browser
// It won't have access to Node.js APIs
const inngest = new Inngest({
  id: 'youtube-seo-app-client',
  // We don't need the event key on the client side
});

export { inngest };

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' since we need server-side functionality
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Load environment variables for server-side code
  serverRuntimeConfig: {
    // Will only be available on the server side
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  // Environment variables available on both server and client
  publicRuntimeConfig: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  },
  webpack: (config, { isServer, webpack }) => {
    // Handle node: protocol for Node.js built-in modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Mark node: protocol modules as external
        'node:async_hooks': false,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
      
      // Exclude inngest from client-side bundle
      config.externals = config.externals || [];
      config.externals.push('inngest');
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['inngest'],
  },
};

module.exports = nextConfig;

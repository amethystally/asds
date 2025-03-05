/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  distDir: 'out',
  // Ensure trailing slashes are used for static exports
  trailingSlash: process.env.STATIC_EXPORT === "true",
  // Vercel-specific optimizations
  experimental: {
    webpackBuildWorker: true,
  },
  // Ensure API routes work correctly on Vercel
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
}

export default nextConfig;


/**
 * Gets the base URL for API requests, handling Vercel deployments correctly
 */
export function getBaseUrl() {
  // For server-side rendering on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // For client-side rendering on Vercel
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // For local development
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
}


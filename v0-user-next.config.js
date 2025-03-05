/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  distDir: "out",
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are used for static exports
  trailingSlash: process.env.STATIC_EXPORT === "true",
}

module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Busting Vercel Cache
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
};
export default nextConfig;

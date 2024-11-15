/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['structify-app.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false, 
      },
    ];
  },

};

export default nextConfig;

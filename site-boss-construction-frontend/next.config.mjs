/** @type {import('next').NextConfig} */
const nextConfig = {
    skipTrailingSlashRedirect: true,
    trailingSlash: true,
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        SESSION_SECRET: process.env.NEXT_PUBLIC_SESSION_SECRET,
    },
};

export default nextConfig;

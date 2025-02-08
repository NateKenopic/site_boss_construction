/** @type {import('next').NextConfig} */
const nextConfig = {
    skipTrailingSlashRedirect: true,
    trailingSlash: true,
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
